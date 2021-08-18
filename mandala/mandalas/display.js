/**
 * mandalas/display.js
 * Autor: Alan Badillo Salas (Dragón Nómada)
 * Support: dragonnomada123@gmail.com
 * Github: https://github.com/dragonnomada
 * Blog: dragonnomada.medium.com
 * Created at August 2021
 */

// mandala display <params>
// Ex. mandala display text @name=username
mandalaJS("display", ({ node, params }) => {
    // params: ["text", "@name=username"]
    const [variant, alias] = params;

    if (variant === "text") {
        // alias: "@name=username"
        // key: "@name"
        // containerKey: "username"
        const [key, containerKey] = alias.split("=");

        // template: "Username: @name"
        const template = node.textContent;

        // When container is updated
        mandalaJS.subscribeUpdateContainer(() => {
            // Update textContent of the `node`
            // Replace all keys ("@name") with container[containerKey] (container["username"])
            node.textContent = template.replace(new RegExp(key, "g"), mandalaJS.container[containerKey] || "");
        })

        // Bootstrap first
        node.textContent = template.replace(new RegExp(key, "g"), mandalaJS.container[containerKey] || "");
    }
})