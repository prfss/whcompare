import init, { generate_report } from "../pkg/web.js"
init().then(async () => {
    document.getElementById("generate-report").addEventListener("click", async () => { 
        const may_data = await generate_report();
        if (may_data?.length ?? 0 >= 2) {
            const [data, x_ticks_label] = may_data;
            c3.generate({
                bindto: '#chart-area',
                data,
                axis: { x: { tick: { format: (x) => x_ticks_label[x] } } }
            });
            katex_render();
        }
    }, false);
})