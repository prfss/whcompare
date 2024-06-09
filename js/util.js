function katex_render() {
    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false,
        strict: false
    });
}

function draw_chart(data, x_ticks_label, bindto, log_scale, is_scatter) {
    bb.generate({
        bindto,
        data,
        axis: {
            x: { tick: { format: (x) => x_ticks_label[x] } },
            y: log_scale ? { type: "log" } : null
        },
        line: {
            classes: is_scatter ? ["pseudo-scatter"] : null
        },
        tooltip: {
            order: "desc"
        }
    });
}