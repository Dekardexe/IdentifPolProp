app.component('third-form', {
  props: {
    prem: {
      type: Boolean,
      requiered: true,

    }

  },
  template:
    /*html*/
    `
    <form class="review-form" @submit.prevent="onSubmit">
    <div><button v-on:click="loadData" >Загрузить данные из файла</button></div>

      <input v-model.number="c0OLD" placeholder="Введите значение С0">
      <input v-model.number="c1OLD" placeholder="Введите значение С1">
      <input v-model.number="c2OLD" placeholder="Введите значение С2">
      <input v-model.number="c3OLD" placeholder="Введите значение С3">
      <input v-model.number="lamb1OLD" placeholder="Введите значение &#955;1">
      <input v-model.number="lamb2OLD" placeholder="Введите значение &#955;2">
      <input v-model.number="lamb3OLD" placeholder="Введите значение &#955;3">
      <input v-model.number="t" placeholder="Введите значение t">
      <input v-model.number="del" placeholder="Введите значение &#916;">
      
      <div><button v-on:click="mainFunc" >Выполнить расчёт</button></div>
    </form>
    
   
  
  
  `,
  data() {
    return {
      c0OLD: null,
      c1OLD: null,
      c2OLD: null,
      c3OLD: null,
      lamb1OLD: null,
      lamb2OLD: null,
      lamb3OLD: null,
      t: null,
      del: null,
      p: [],
      sigma: 1.0,
    }
  },
  methods: {
    loadData() {
      let value = localStorage["text"];
      //value = [5, -2, -0.5, 1, 5, 0.2, 0.05];
      value = value.split(' ');

      if (value != null) {
        this.c0OLD = Number(value[0]);
        this.c1OLD = Number(value[1]);
        this.c2OLD = Number(value[2]);
        this.lamb1OLD = Number(value[3]);
        this.lamb2OLD = Number(value[4]);
        this.t = Number(value[5]);
        this.del = Number(value[6]);
      }
      //console.log(value, localStorage["text"], typeof (value), localStorage.length, this.c0OLD, this.isDataLoaded);
    },
    getRand(min, max) {
      return Math.random() * (max - min) + min;
    },

     //Подготовительная функция
     preparing() {
      //preparing lambd
      this.lamb1OLD = -1 * Math.abs(this.lamb1OLD);
      this.lamb2OLD = -1 * Math.abs(this.lamb2OLD);
      this.lamb3OLD = -1 * Math.abs(this.lamb3OLD);

      //preparing data to graph
      let graphXData = [];
      let graphYData = [];
      for (let i = 0; i < 5; i += 0.05) {
        let thisEps = this.c0OLD + this.c1OLD * Math.exp(this.lamb1OLD * (i)) + this.c2OLD * Math.exp(this.lamb2OLD * (i));
        //Попытка введения погрешности для графика
        //thisEps = thisEps * (1 + (0.0001 * this.getRand(-1, 1)) );
        graphYData.push(thisEps);
        graphXData.push(i);
        //console.log('OLDEPS = ',thisEps)

      }
      localStorage["x"] = graphXData;
      localStorage["y"] = graphYData;
    },
    eps() {
      for (let i = 0; i <= 4; i++) {
        this.p[i] = this.c0OLD + this.c1OLD * Math.exp(this.lamb1OLD * (this.t + this.del * i)) + this.c2OLD * Math.exp(this.lamb2OLD * (this.t + this.del * i)) + this.c3OLD * Math.exp(this.lamb3OLD * (this.t + this.del * i));
        console.log('this.c3OLD * Math.exp(this.lamb3OLD * (this.t + this.del * i)) == ', this.c3OLD * Math.exp(this.lamb3OLD * (this.t + this.del * i)));
        console.log('p[i] == ', this.p[i])
      }

    },
    cor() {
      let v = this.letV;
      let arrayOfx = [];
      let a = v[1] * v[3] - v[2] * v[2];
      let b = -v[1] * v[4] + v[2] * v[3];
      let c = v[2] * v[4] - v[3] * v[3];
      let D = b * b - 4 * a * c;
      if (D > 0) {
        let x1 = (-1 * b + Math.sqrt(D)) / (2 * a);
        let x2 = (-1 * b - Math.sqrt(D)) / (2 * a);
        arrayOfx[0] = x1;
        arrayOfx[1] = x2;
        console.log(`Два разных корня`)
        return arrayOfx;
      }
      else if (D = 0) {
        let x1 = (-1 * b) / (2 * a);
        arrayOfx[0] = x1;
        arrayOfx[1] = x1;
        console.log(`Два одинаковых корня`)
        return arrayOfx;
      }
      else alert(`нет корней :(`);
    },
    sus(z1, z2, v1, v2) {
      let arrayOfx = [];
      let y1;
      let y2;
      y2 = (z1 * v1 - v2) / (z1 - z2);
      y1 = v1 - y2;
      arrayOfx[0] = y1;
      arrayOfx[1] = y2;

      return arrayOfx;
    },

    mainFunc() {
      this.preparing();
      this.eps();
      /////////////////////
      let z1 = this.cor()[0];
      let z2 = this.cor()[1];

      //console.log('z1== ', z1, 'z2==', z2);
      let lamb1 = Math.log(z1) / this.del;
      let lamb2 = Math.log(z2) / this.del;

      let y1 = this.sus(z1, z2, this.letV[1], this.letV[2])[0];
      let y2 = this.sus(z1, z2, this.letV[1], this.letV[2])[1];

      let c1 = y1 / (Math.exp(lamb1 * this.t) * (1 - Math.exp(lamb1 * this.del)));
      let c2 = y2 / (Math.exp(lamb2 * this.t) * (1 - Math.exp(lamb2 * this.del)));

      let c0 = this.p[0] - c1 * Math.exp(lamb1 * this.t) - c2 * Math.exp(lamb2 * this.t);

      if (((this.lamb1OLD < this.lamb2OLD) && (z1 > z2)) || ((this.lamb1OLD > this.lamb2OLD) && (z1 < z2))) {
        let f = c1;
        c1 = c2;
        c2 = f;
        //console.log(`lamb was reversed`);
      } else { console.log(`wasn't reversed`) }

      let b0 = (this.sigma / c0);
      let b1 = (this.sigma / c0 * ((lamb1 + lamb2) / (lamb1 * lamb2)));
      let b2 = (this.sigma / (c0 * lamb1 * lamb2));

      let res = [c0, c1, c2, lamb1, lamb2, this.c0OLD, this.c1OLD, this.c2OLD, this.lamb1OLD, this.lamb2OLD, b0, b1, b2,];
      this.$emit('imp-data', res);

      let graphYNewData = [];
      let graphXNewData = [];
      for (let i = 0; i <= 5; i += this.del) {
        let thisEps = c0 + c1 * Math.exp(lamb1 * (i)) + c2 * Math.exp(lamb2 * (i));
        graphYNewData.push(thisEps);
        graphXNewData.push(i);
        //console.log('NEWEPS = ', thisEps);
      }
      localStorage["yNew"] = graphYNewData;
      localStorage["xNew"] = graphXNewData;

      return 1;
    },


    onSubmit() {

    }

  },
  computed: {
    letV() {
      let v = [];
      for (let x = 1; x <= 4; x++) {
        v[x] = this.p[x - 1] - this.p[x];
      }
      return v;
    },




  },
})