import init, { generate_report, recalculate_chart_data } from "../pkg/web.js"

function draw_chart(data, x_ticks_label) {
    let log_scale = document.getElementById("log-scale").checked;
    let is_scatter = document.getElementById("plot-style").value == "scatter";

    bb.generate({
        bindto: '#score-chart-image',
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
    katex_render();
}

async function update_chart() {
    const may_data = await recalculate_chart_data();
    if (may_data?.length ?? 0 >= 2) {
        const [data, x_ticks_label] = may_data;
        draw_chart(data, x_ticks_label);
    }
}

async function update_summary() {
    await wasm_update_summary();
    katex_render();
}

init().then(async () => {
    document.getElementById("generate-report").addEventListener("click", async () => {
        const may_data = await generate_report();
        if (may_data?.length ?? 0 >= 2) {
            const [data, x_ticks_label] = may_data;
            draw_chart(data, x_ticks_label);

            document.getElementById("plot-style").addEventListener("change", update_chart, false);
            document.getElementById("axis").addEventListener("change", update_chart, false);
            document.getElementById("repr").addEventListener("change", update_chart, false);
            document.getElementById("log-scale").addEventListener("change", update_chart, false);
        }
    }, false);

})