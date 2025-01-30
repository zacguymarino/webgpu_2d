import { Texture } from "./texture.js";
import { shaderSource } from "./shaders.js";

export class SpritePipeline {

    pipeline;
    textureBindGroup;
    projectionViewBindGroup;

    static create(device, texture, projectionViewMatrixBuffer) {
        const pipeline = new SpritePipeline();
        pipeline.initialize(device, texture, projectionViewMatrixBuffer);
        return pipeline;
    }
    initialize(device, texture, projectionViewMatrixBuffer) {
        const shaderModule = device.createShaderModule({
            code: shaderSource
        });

        const bufferLayout = {
            arrayStride: 7 * 4, //7 floats which are 4 bytes each
            attributes: [ //Describe where each type of data is in the buffer (xy,uv,rgb)
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x2"
                },
                {
                    shaderLocation: 1,
                    offset: 2 * 4,
                    format: "float32x2"
                },
                {
                    shaderLocation: 2,
                    offset: 4 * 4,
                    format: "float32x3"
                }
            ],
            stepMode: "vertex"
        };

        const vertexState = {
            module: shaderModule,
            entryPoint: "vertexMain",
            buffers: [
                bufferLayout
            ]
        };

        const fragmentState = {
            module: shaderModule,
            entryPoint: "fragmentMain",
            targets: [
                {
                    format: navigator.gpu.getPreferredCanvasFormat(),
                    blend: {
                        color: {
                            srcFactor: "src-alpha",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        },
                        alpha: {
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        }
                    }
                }
            ]
        };

        //Uniform bind group (for camera)
        const projectionViewBindGroupLayout = device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "uniform"
                    }
                }
            ]
        });

        //Uniform bind group (for texture)
        const textureBindGroupLayout = device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {}
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: {}
                }
            ]
        });

        const pipelineLayout = device.createPipelineLayout({
            bindGroupLayouts: [
                projectionViewBindGroupLayout,
                textureBindGroupLayout
            ]
        });

        this.textureBindGroup = device.createBindGroup({
            layout: textureBindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: texture.sampler
                },
                {
                    binding: 1,
                    resource: texture.texture.createView()
                }
            ]
        });

        this.projectionViewBindGroup = device.createBindGroup({
            layout: projectionViewBindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: projectionViewMatrixBuffer
                    }
                }
            ]
        });

        this.pipeline = device.createRenderPipeline({
            vertex: vertexState,
            fragment: fragmentState,
            primitive: {
                topology: "triangle-list"
            },
            layout: pipelineLayout,
        }); 
    }
}