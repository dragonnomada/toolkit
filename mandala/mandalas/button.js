/**
 * mandalas/button.js
 * Autor: Alan Badillo Salas (Dragón Nómada)
 * Support: dragonnomada123@gmail.com
 * Github: https://github.com/dragonnomada
 * Blog: dragonnomada.medium.com
 * Created at August 2021
 */

// mandala button <params>
// Ex. mandala button click alert container
mandalaJS("button", ({ node, params }) => {
    // params: ["click", "alert", "container"]
    const [eventName, program, ...otherParams] = params;

    node.addEventListener(eventName, event => {
        if (program === "alert") {
            // otherParams: ["container"]
            const [mode] = otherParams;
            
            if (mode === "container") {
                alert(JSON.stringify(mandalaJS.container));
            }
        }
    });
})