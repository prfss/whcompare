import init, { generate_report, recalculate_chart_data } from "../pkg/web.js"


function draw_chart(data, x_ticks_label) {
    c3.generate({
        bindto: '#chart-image',
        data,
        axis: { x: { tick: { format: (x) => x_ticks_label[x] } } }
    });
    katex_render();
}

init().then(async () => {
    document.getElementById("generate-report").addEventListener("click", async () => {
        const may_data = await generate_report();
        if (may_data?.length ?? 0 >= 2) {
            const [data, x_ticks_label] = may_data;
            draw_chart(data, x_ticks_label);

            document.getElementById("chart-type").addEventListener("change", async () => {
                const may_data = await recalculate_chart_data();
                if (may_data?.length ?? 0 >= 2) {
                    const [data, x_ticks_label] = may_data;
                    draw_chart(data, x_ticks_label);
                }
            }, false);
        }
    }, false);

})