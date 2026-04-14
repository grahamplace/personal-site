export function normalizeColor(hexCode: number): [number, number, number] {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (hexCode & 255) / 255,
  ];
}

const VERTEX_SOURCE = `#version 300 es
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Ported from Orange Collective's wave shader, adapted to WebGL2 GLSL 300 es.
// Uses 3 color uniforms for wave coloring + 1 ambient color.
// Video variant removed. Pixelation grid retained.
const FRAGMENT_SOURCE = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_pixelSize;
uniform float u_borderIntensity;
uniform float u_waveIntensity;
uniform float u_waveWidth;

float waveValue(in vec2 uv, float d, float offset) {
  return 1.0 - smoothstep(0.0, d, distance(uv.x, 0.5 + sin(offset + uv.y * 3.0) * 0.3));
}

vec4 waveBackground(vec2 uv, float offset) {
  vec2 centeredUV = uv;
  float aspect = u_resolution.x / u_resolution.y;
  if (aspect > 1.0) {
    centeredUV.x = (centeredUV.x - 0.5) * aspect + 0.5;
  } else {
    centeredUV.y = (centeredUV.y - 0.5) / aspect + 0.5;
  }
  float d = (0.05 + abs(sin(offset * 0.2)) * 0.25 * distance(centeredUV.y, 0.5)) * u_waveWidth;
  float r = waveValue(centeredUV + vec2(d * 0.25, 0.0), d, offset);
  float g = waveValue(centeredUV - vec2(0.015, 0.005), d, offset);
  float b = waveValue(centeredUV - vec2(d * 0.5, 0.015), d, offset);
  return vec4(r, g, b, 1.0);
}

vec4 pixelate(vec2 fragCoord, vec4 backgroundColor) {
  float pixelPrecision = 3.0;
  vec2 pixel = fragCoord - vec2(ivec2(fragCoord.xy) % int(u_pixelSize));
  float precisePixel = floor(u_pixelSize / pixelPrecision);

  vec4 color = vec4(0.0);
  for (float i = 0.0; i < pixelPrecision; i++) {
    vec2 sampleCoord = pixel + precisePixel * i;
    vec2 sampleUV = sampleCoord / u_resolution.xy;

    vec4 sourceColor = waveBackground(sampleUV, u_time + 3.7) * 0.3 +
                       waveBackground(sampleUV + vec2(0.15, 0.0), -u_time * 2.0 + 8.2) * 0.3 +
                       waveBackground(sampleUV + vec2(0.3, 0.0), u_time * 3.3 + 15.1) * 0.3 +
                       waveBackground(sampleUV - vec2(0.2, 0.0), -u_time * 1.7 + 22.6) * 0.3 +
                       waveBackground(sampleUV - vec2(0.4, 0.0), u_time * 2.5 + 31.4) * 0.3;

    color += sourceColor;
  }
  color = color / pixelPrecision;

  // Map wave RGB channels to our color uniforms
  vec3 colorMix = color.r * u_color1 + color.g * u_color2 + color.b * u_color3;
  float colorIntensity = (color.r + color.g + color.b) / 3.0;
  colorMix *= u_waveIntensity;

  // Subtle ambient from 4th color
  colorMix += u_color4 * 0.08;

  color = vec4(colorMix, colorIntensity);

  // Grid border lines
  if ((int(fragCoord.y) % int(u_pixelSize) == 0) ||
      (int(fragCoord.x) % int(u_pixelSize) == 0)) {
    color.rgb -= vec3(u_borderIntensity * 0.3);
  }

  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec4 background = waveBackground(uv, u_time + 3.7) * 0.3 +
                    waveBackground(uv + vec2(0.15, 0.0), -u_time * 2.0 + 8.2) * 0.3 +
                    waveBackground(uv + vec2(0.3, 0.0), u_time * 3.3 + 15.1) * 0.3 +
                    waveBackground(uv - vec2(0.2, 0.0), -u_time * 1.7 + 22.6) * 0.3 +
                    waveBackground(uv - vec2(0.4, 0.0), u_time * 2.5 + 31.4) * 0.3;

  vec4 mosaicColor = pixelate(gl_FragCoord.xy, background);

  fragColor = vec4(mosaicColor.rgb, 1.0);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

type Color3 = [number, number, number];

export class Gradient {
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private animationFrameId = 0;
  private startTime = 0;
  private currentColors: Color3[] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  private startColors: Color3[] | null = null;
  private targetColors: Color3[] | null = null;
  private transitionStart = 0;
  private transitionDuration = 300;
  private uTime: WebGLUniformLocation | null = null;
  private uResolution: WebGLUniformLocation | null = null;
  private uColor1: WebGLUniformLocation | null = null;
  private uColor2: WebGLUniformLocation | null = null;
  private uColor3: WebGLUniformLocation | null = null;
  private uColor4: WebGLUniformLocation | null = null;
  private uPixelSize: WebGLUniformLocation | null = null;
  private uBorderIntensity: WebGLUniformLocation | null = null;
  private uWaveIntensity: WebGLUniformLocation | null = null;
  private uWaveWidth: WebGLUniformLocation | null = null;
  private boundRender: (t: number) => void;
  private boundResize: () => void;

  constructor() {
    this.boundRender = this.render.bind(this);
    this.boundResize = this.resize.bind(this);
  }

  initGradient(selector: string): this {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) return this;

    const gl = this.canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
    });
    if (!gl) {
      this.canvas.style.background = '#0a0a0a';
      return this;
    }
    this.gl = gl;

    this.readCssColors();
    this.setupWebGL();
    this.resize();

    window.addEventListener('resize', this.boundResize);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.animationFrameId) {
        this.animationFrameId = requestAnimationFrame(this.boundRender);
      }
    });

    this.startTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.boundRender);
    this.canvas.classList.add('isLoaded');
    return this;
  }

  updateColors(colors: number[]): void {
    const newTarget = colors.map(normalizeColor) as Color3[];

    if (this.targetColors && this.startColors) {
      const t = this.easeOut(
        Math.min(
          1,
          (performance.now() - this.transitionStart) / this.transitionDuration
        )
      );
      this.currentColors = this.currentColors.map(
        (c, i) =>
          c.map(
            (v, j) =>
              v + (this.targetColors![i][j] - this.startColors![i][j]) * t
          ) as Color3
      );
    }

    this.startColors = this.currentColors.map((c) => [...c] as Color3);
    this.targetColors = newTarget;
    this.transitionStart = performance.now();
  }

  private readCssColors(): void {
    if (!this.canvas) return;
    const style = getComputedStyle(this.canvas);
    for (let i = 0; i < 4; i++) {
      const raw = style.getPropertyValue(`--gradient-color-${i + 1}`).trim();
      if (raw) {
        let hex = raw;
        if (hex.length === 4) {
          hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
        }
        const val = parseInt(hex.replace('#', ''), 16);
        this.currentColors[i] = normalizeColor(val);
      }
    }
  }

  private setupWebGL(): void {
    const gl = this.gl!;
    this.program = createProgram(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);
    gl.useProgram(this.program);

    // Fullscreen quad
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // prettier-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,  1, 1,
    ]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    this.uTime = gl.getUniformLocation(this.program, 'u_time');
    this.uResolution = gl.getUniformLocation(this.program, 'u_resolution');
    this.uColor1 = gl.getUniformLocation(this.program, 'u_color1');
    this.uColor2 = gl.getUniformLocation(this.program, 'u_color2');
    this.uColor3 = gl.getUniformLocation(this.program, 'u_color3');
    this.uColor4 = gl.getUniformLocation(this.program, 'u_color4');
    this.uPixelSize = gl.getUniformLocation(this.program, 'u_pixelSize');
    this.uBorderIntensity = gl.getUniformLocation(
      this.program,
      'u_borderIntensity'
    );
    this.uWaveIntensity = gl.getUniformLocation(
      this.program,
      'u_waveIntensity'
    );
    this.uWaveWidth = gl.getUniformLocation(this.program, 'u_waveWidth');

    // Set static uniforms (matching reference defaults)
    gl.uniform1f(this.uPixelSize, 10.0);
    gl.uniform1f(this.uBorderIntensity, 0.8);
    gl.uniform1f(this.uWaveIntensity, 1.0);
    gl.uniform1f(this.uWaveWidth, 1.0);
  }

  private resize(): void {
    if (!this.canvas || !this.gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(this.canvas.clientWidth * dpr);
    const h = Math.floor(this.canvas.clientHeight * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
  }

  private easeOut(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }

  private getInterpolatedColors(): Color3[] {
    if (!this.targetColors || !this.startColors) return this.currentColors;

    const elapsed = performance.now() - this.transitionStart;
    const rawT = Math.min(1, elapsed / this.transitionDuration);
    const t = this.easeOut(rawT);

    const result = this.startColors.map(
      (start, i) =>
        start.map((v, j) => v + (this.targetColors![i][j] - v) * t) as Color3
    );

    if (rawT >= 1) {
      this.currentColors = this.targetColors;
      this.startColors = null;
      this.targetColors = null;
    }

    return result;
  }

  private render(timestamp: number): void {
    if (document.hidden) {
      this.animationFrameId = 0;
      return;
    }

    const gl = this.gl!;
    const time = (timestamp - this.startTime) * 0.000125;

    gl.uniform1f(this.uTime, time);
    gl.uniform2f(this.uResolution, this.canvas!.width, this.canvas!.height);

    const colors = this.getInterpolatedColors();
    gl.uniform3fv(this.uColor1, colors[0]);
    gl.uniform3fv(this.uColor2, colors[1]);
    gl.uniform3fv(this.uColor3, colors[2]);
    gl.uniform3fv(this.uColor4, colors[3]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.animationFrameId = requestAnimationFrame(this.boundRender);
  }
}
