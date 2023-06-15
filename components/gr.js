function graphBuild() {
    console.log(`Зашли в скрипт по отрисовке графика`);
    let initialX = localStorage["x"].trim().split(',');
    let initialY = localStorage["y"].trim().split(',');
    let restoredX = localStorage["xNew"].trim().split(',');
    let restoredY = localStorage["yNew"].trim().split(',');
    console.log(restoredY.length, initialY.length, initialX.length);
    localStorage.clear();
    TESTER = document.getElementById('tester');
    let trace1 = {
      x: initialX,
      y: initialY,
      mode: 'lines',
      name: 'Точн. знач. &#949;(t)',
      line: {
        dash: 'solid',
        width: 4
      }
    };
    let trace2 = {
      x: restoredX,
      y: restoredY,
      mode: 'lines',
      name: 'Восст. знач. &#949;(t)',
      line: {
        dash: 'dot',
        width: 5,
        color: 'orange',
      }
    };
    let data = [trace1, trace2];

    var layout = {
      title: '&#949;(t) = C<sub>0</sub> + C<sub>1</sub>e<sup>-&#955;<sub>1</sub>t</sup> + C<sub>2</sub>e<sup>-&#955;<sub>2</sub>t</sup>',
      font: {
        size: 28,
      },
      xaxis: {
        title: {
          text: "время (t)",
          standoff: 40,
        },
        range: [0, 100],
        autorange: false,
        
      },
      yaxis: {
        automargin: true,
        title: {
          text: "деформация (&#949;)",
          standoff: 40,
        },
        range: [0, 5],
        autorange: false,
      },
      legend: {
        y: 0.5,
        traceorder: 'reversed',
        font: {
          size: 15
        }
      }
    };

    Plotly.newPlot(TESTER, data, layout);
  }
graphBuild();