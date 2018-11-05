import { minify } from "uglify-js";

export default (opts = {}) => {

    return {
        name: "uglify",
        renderStart() {

        },
        renderChunk(code) {
            return minify(code);
        }
    }
}
