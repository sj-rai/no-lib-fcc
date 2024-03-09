class SketchPad {
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas");
        this.canvas.height = size;
        this.canvas.width = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px blue;
        `;
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.paths = [];
        this.isDrawing = false;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (e) => {
            const mouse = this.#getMouse(e);
            // this.path=[mouse];
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (e) => {
            if(this.isDrawing) {
                const mouse = this.#getMouse(e);
                // this.path.push(mouse)
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse)
                this.#redraw()
            }
        }
        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }

        /* Touch event handlers for mobile */
        this.canvas.ontouchstart = (e) => {
            const loc = e.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (e) => {
            const loc = e.touches[0];
            this.canvas.onmousemove(loc);
        }
        this.canvas.ontouchend = (e) => {
            this.canvas.onmouseup();
        }
    }

    #getMouse = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(e.clientX-rect.left),
            Math.round(e.clientY-rect.top)
        ];
    }

    #redraw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
    }
}