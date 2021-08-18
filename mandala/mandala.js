/**
 * mandala.js
 * Autor: Alan Badillo Salas (Dragón Nómada)
 * Support: dragonnomada123@gmail.com
 * Github: https://github.com/dragonnomada
 * Blog: dragonnomada.medium.com
 * Created at August 2021
 */

console.log("mandala.js v1.0.0");

function mandalaJS(name, handler) {
    mandalaJS.registerMandala(name, handler);
}

mandalaJS.scanNodes = root => {
    let index = 0;
    for (let node of root.childNodes) {
        if (node.nodeType === Node.COMMENT_NODE) {
            if (node.nodeValue.match(/^\s*mandala\s+/)) {
                // console.log(JSON.stringify(node.nodeValue));
                const sibling = node.nextElementSibling;
                // console.log(sibling);
                const mandala = {
                    parts: node.nodeValue.trim().split(/\s+/).slice(1),
                    tag: sibling.tagName,
                    index: index++
                }
                mandalaJS.registerNode(sibling, mandala);
            }
            continue;
        }
        mandalaJS.scanNodes(node);
    }
};

mandalaJS.nodes = [];

mandalaJS.registerNode = (node, mandala) => {
    if (node.mandala) {
        console.warn("mandala/registerNode [IGNORED]", node, mandala);
        return;
    }
    console.log("mandala/registerNode", node, mandala);
    mandala.node = node;
    [mandala.name, ...mandala.params] = mandala.parts;
    node.mandala = mandala;
    mandalaJS.nodes.push(node);
};

mandalaJS.mandalas = {};

mandalaJS.registerMandala = (name, handler) => {
    console.log("mandala/registerMandala", name, handler);
    mandalaJS.mandalas[name] = handler;
};

mandalaJS.getNodes = name => {
    return mandalaJS.nodes.filter(node => node.mandala.name === name);
};

mandalaJS.runMandala = name => {
    const nodes = mandalaJS.getNodes(name);
    
    console.log("mandala/runMandala", name, nodes);

    const handler = mandalaJS.mandalas[name];

    for (let node of nodes) {
        if (node.lockRunMandalaAgain) continue;
        node.lockRunMandalaAgain = true;
        handler(node.mandala);
    }
};

mandalaJS.runAllMandalas = () => {
    console.log("mandala/runAllMandalas", mandalaJS.mandalas);
    for (let name in mandalaJS.mandalas) {
        mandalaJS.runMandala(name);
    }
};

mandalaJS.container = {};

mandalaJS.subscribeUpdateContainer = listener => {
    const handler = ({ detail }) => {
        const { partial } = detail;
        listener({ partial });
    };

    document.addEventListener("mandala/updateContainer", handler);

    return () => {
        document.removeEventListener("mandala/updateContainer", handler);
    };
};

mandalaJS.updateContainer = partial => {
    mandalaJS.container = {
        ...mandalaJS.container,
        ...partial
    };

    console.log("mandala/updateContainer", mandalaJS.container);

    document.dispatchEvent(new CustomEvent("mandala/updateContainer", {
        detail: {
            partial
        }
    }))
};

mandalaJS.registerAllNodes = root => {
    for (let node of [...root.querySelectorAll("[data-mandala]")]) {
        if (node.lockRegisterMandalaAgain) continue;
        node.lockRegisterMandalaAgain = true;
        const mandala = JSON.parse(atob(node.dataset.mandala));
        mandalaJS.registerNode(node, mandala);
    }
};

mandalaJS.startWithBuilder = () => {
    console.log("mandala.js - Starting with Builder...");

    mandalaJS.registerAllNodes(document);

    mandalaJS.runAllMandalas();

    console.log("mandala.js - Ready!");
};

mandalaJS.start = () => {
    console.log("mandala.js - Starting...");

    mandalaJS.scanNodes(document);

    mandalaJS.runAllMandalas();

    console.log("mandala.js - Ready!");
};