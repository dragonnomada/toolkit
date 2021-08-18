/**
 * mandalas/input.js
 * Autor: Alan Badillo Salas (Dragón Nómada)
 * Support: dragonnomada123@gmail.com
 * Github: https://github.com/dragonnomada
 * Blog: dragonnomada.medium.com
 * Created at August 2021
 */

// mandala input <params>
// Ex. mandala input change value as username
mandalaJS("input", ({ node, params }) => {
    // params: ["change", "value", "as", "username"]
    const [eventName, key, mode, ...otherParams] = params;

    node.addEventListener(eventName, event => {
        if (mode === "as") {
            // otherParams: ["username"]
            const [containerKey] = otherParams;
            mandalaJS.updateContainer({ [containerKey]: node[key] || "" });
        }
    });
})