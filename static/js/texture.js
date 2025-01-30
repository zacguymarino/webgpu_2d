export class Texture {
    constructor(texture, sampler, id, width, height) {
        this.texture = texture;
        this.sampler = sampler;
        this.id = id;
        this.width = width;
        this.height = height;
    }

    static async createTexture(device, image) {
        const texture = device.createTexture({
            size: {width: image.width, height: image.height},
            format: "rgba8unorm",
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT
        });

        const data = await createImageBitmap(image);

        device.queue.copyExternalImageToTexture(
            {source: data},
            {texture: texture},
            {width: image.width, height: image.height}
        );

        const sampler = device.createSampler({
            magFilter: "nearest",
            minFilter: "nearest"
        });

        return new Texture(texture, sampler, image.src, image.width, image.height);
    }

    static async createTextureFromURL(device, url) {
        const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => {
                console.error(`Failed to load image ${url}`);
                reject();
            }
        });

        const image = await promise;
        return Texture.createTexture(device, image);
    }
}