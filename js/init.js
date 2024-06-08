import init, { generate_report, recalculate_chart_data } from "../pkg/web.js"

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

function draw_score_chart(data, x_tick_label) {
    let log_scale = document.getElementById("log-scale").checked;
    let is_scatter = document.getElementById("plot-style").value == "scatter";
    draw_chart(data, x_tick_label, "#score-chart-image", log_scale, is_scatter);
}

function draw_time_chart(data, x_tick_label) {
    draw_chart(data, x_tick_label, "#time-chart-image", false, true);
}

async function update_score_chart() {
    const may_data = await recalculate_chart_data();
    console.log(may_data);
    if (may_data?.length ?? 0 >= 2) {
        const [data, x_ticks_label] = may_data;
        draw_score_chart(data, x_ticks_label);
    }
    katex_render();
}

init().then(async () => {
    document.getElementById("generate-report").addEventListener("click", async () => {
        const may_data = await generate_report();
        if (may_data?.length ?? 0 >= 2) {
            const [score_data, score_x_ticks_label, time_data, time_x_ticks_label] = may_data;
            draw_score_chart(score_data, score_x_ticks_label);
            draw_time_chart(time_data, time_x_ticks_label);
            katex_render();

            document.getElementById("plot-style").addEventListener("change", update_score_chart, false);
            document.getElementById("axis").addEventListener("change", update_score_chart, false);
            document.getElementById("repr").addEventListener("change", update_score_chart, false);
            document.getElementById("log-scale").addEventListener("change", update_score_chart, false);
        }
    }, false);

})