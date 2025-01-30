import { Texture } from "./texture.js"
import { Rect } from "./rect.js";
import { Sprite } from "./sprite.js";

export class Content {
    static playerTexture;
    static ufoRedTexture;
    static uvTexture;
    static spriteSheet;
    static backgroundTexture;

    static sprites = {};

    static async initialize(device) {
        Content.playerTexture = await Texture.createTextureFromURL(device, "/static/images/PNG/playerShip1_blue.png");
        Content.ufoRedTexture = await Texture.createTextureFromURL(device, "/static/images/PNG/ufoRed.png");
        Content.uvTexture = await Texture.createTextureFromURL(device, "/static/images/uv_test.png");
        Content.spriteSheet = await Texture.createTextureFromURL(device, "/static/images/spaceSheet.png");
        Content.backgroundTexture = await Texture.createTextureFromURL(device, "/static/images/paleBlueDot.png");
        await this.loadSpriteSheet();
    }

    static async loadSpriteSheet() {
        const sheetXmlReq = await fetch("/static/images/spaceSheet.xml");
        const sheetXmlText = await sheetXmlReq.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetXmlText, "text/xml");

        xmlDoc.querySelectorAll("SubTexture").forEach((subTexture) => {
            const name = subTexture.getAttribute("name").replace(".png", "");
            const x = parseInt(subTexture.getAttribute("x"));
            const y = parseInt(subTexture.getAttribute("y"));
            const width = parseInt(subTexture.getAttribute("width"));
            const height = parseInt(subTexture.getAttribute("height"));

            const drawRect = new Rect(0, 0, width, height);
            const sourceRect = new Rect(x, y, width, height);

            this.sprites[name] = new Sprite(this.spriteSheet, drawRect, sourceRect);
        });
    }
}