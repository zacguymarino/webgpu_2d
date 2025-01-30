export class BufferUtil {
    static createVertexBuffer(device, data) {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });

        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();

        return buffer;
    }

    static createIndexBuffer(device, data) {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });

        new Uint16Array(buffer.getMappedRange()).set(data);
        buffer.unmap();

        return buffer;
    }

    static createUniformBuffer(device, data) {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        return buffer;
    }
}