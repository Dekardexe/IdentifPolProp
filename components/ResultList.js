app.component('result-list', {
  props: {
    res: {
      type: Array,
      required: true,
    }
  },
  template:
    /*html*/
    `
    <div class="results-container" v-show="res[0]">
      <h3>Восстановленные значения</h3>
      <ul>
      <!--
        <li> c<sub>0</sub> = {{res[0].toFixed(6)}}</li>
        <li> c<sub>1</sub> = {{res[1].toFixed(6)}}</li>
        <li> c<sub>2</sub> = {{res[2].toFixed(6)}}</li>
        <li> &#955;<sub>1</sub> = {{res[3].toFixed(6)}}</li>
        <li> &#955;<sub>2</sub> = {{res[4].toFixed(6)}}</li>
        <hr>
        -->
        <li> b<sub>0</sub> = {{res[10].toFixed(3)}}</li>
        <li> b<sub>1</sub> = {{res[11].toFixed(3)}}</li>
        <li> b<sub>2</sub> = {{res[12].toFixed(3)}}</li>
      </ul>
    </div>
    
    <table class="results-container">
    <thead>
      <tr>
        <th scope="col">Переменные</th>
        <th scope="col">Точные значения</th>
        <th scope="col">Восстановленные значения</th>
        <th scope="col">Погрешность</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">c<sub>0</sub></th>
        <td>{{res[5]}}</td>
        <td>{{res[0].toFixed(3)}}</td>
        <td>{{resPr[0]}}</td>
      </tr>
      <tr>
        <th scope="row">c<sub>1</sub></th>
        <td>{{res[6]}}</td>
        <td>{{res[1].toFixed(3)}}</td>
        <td>{{resPr[1]}}</td>
      </tr>
      <tr>
        <th scope="row">c<sub>2</sub></th>
        <td>{{res[7]}}</td>
        <td>{{res[2].toFixed(3)}}</td>
        <td>{{resPr[2]}}</td>
      </tr>
      <tr>
      <th scope="row">&#955;<sub>1</sub></th>
      <td>{{res[8]}}</td>
      <td>{{res[3].toFixed(3)}}</td>
      <td>{{resPr[3]}}</td>
    </tr>
    <tr>
    <th scope="row">&#955;<sub>2</sub></th>
    <td>{{res[9]}}</td>
    <td>{{res[4].toFixed(3)}}</td>
    <td>{{resPr[4]}}</td>
  </tr>
    </tbody>
  </table>
    `,
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    resPr() {
      var a = [];

      for (let index = 0; index <= 4; index++) {
        if (Math.abs(((Math.abs(this.res[index] - this.res[index + 5])) / this.res[index + 5]) * 100) < 0.001) {
          a.push("<< 1%");
          console.log(`((Math.abs(this.res[index]-this.res[index + 5]))/this.res[index + 5]) == `, ((Math.abs(this.res[index] - this.res[index + 5])) / this.res[index + 5]));
          //a.push(((Math.abs(this.res[index]-this.res[index + 5]))/this.res[index + 5]).toFixed(6) + '%')
        } else {
          a.push(Math.abs(((Math.abs(this.res[index] - this.res[index + 5])) / this.res[index + 5]) * 100).toFixed(3) + '%')
        }
      }
      if(this.res[5] == null){
      a = [];
      a.push('Нельзя посчитать');
      a.push('Нельзя посчитать');
      a.push('Нельзя посчитать');
      a.push('Нельзя посчитать');
      a.push('Нельзя посчитать');
    }
      return a;
    }
  },

})