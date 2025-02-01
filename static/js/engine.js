 import { Content } from "./content.js";
 import { SpriteRenderer} from "./spriteRenderer.js";
 import { InputManager } from "./inputManager.js";
 import { vec2 } from "gl-matrix";
 
export class Engine {
    #lastTime = 0;
    #canvas;
    #context;
    #device;
    
    #passEncoder;

    spriteRenderer;
    inputManager;
    gameBounds = vec2.create();

    onUpdate(dt) {};
    onDraw() {};

    constructor(){
        this.#canvas = document.getElementById('canvas');
        this.#context = this.#canvas.getContext('webgpu');

        this.gameBounds[0] = this.#canvas.width;
        this.gameBounds[1] = this.#canvas.height;
    }

    async initialize() {
        if (!this.#context) {
            alert('WebGPU not supported!');
            return;
        }

        const adapter = await navigator.gpu.requestAdapter({
            //powerPreference: "low-power"
        });

        if (!adapter) {
            alert('No adapter found');
            return;
        }

        this.#device = await adapter.requestDevice();

        await Content.initialize(this.#device);

        this.#context.configure({
            device: this.#device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });

        this.spriteRenderer = new SpriteRenderer(this.#device, this.#canvas.width, this.#canvas.height);
        this.spriteRenderer.initialize();

        this.inputManager = new InputManager();
    }

    async draw() {

        const now = performance.now();
        const dt = now - this.#lastTime;
        this.#lastTime = now;

        this.onUpdate(dt);

        const commandEncoder = this.#device.createCommandEncoder();
        const textureView = this.#context.getCurrentTexture().createView();
        const renderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                clearValue: {r: 0.8, g: 0.8, b: 0.8, a: 1.0},
                loadOp: 'clear',
                storeOp: 'store'
            }]
        }

        this.#passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        
        this.onDraw(this.spriteRenderer, this.#passEncoder);

        this.spriteRenderer.frameEnd();

        //END DRAW HERE
        this.#passEncoder.end();
        this.#device.queue.submit([commandEncoder.finish()]);

        window.requestAnimationFrame(() => this.draw());
    }
 }
