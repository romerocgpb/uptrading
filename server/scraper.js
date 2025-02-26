const moment = require('moment');

class JanelaDados{
  constructor(headless, execpath){
      this.iniciado = false;
      this.headless = headless || false;
      this.execpath = execpath || "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe";
      this.page = null;
      this.browser = null;
  }
  async iniciar(callback){
    if(this.iniciado==false){
      const puppeteer = await import('puppeteer-core');
      const chlkimp = await import('chalk');
      const chalk = new chlkimp.Chalk()
      const options = {
        args: [
            '--no-sandbox',/*
            '--disable-setuid-sandbox',*/
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            // '--single-process',
            '--disable-gpu',
            //'--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36"', 
          ],
        headless:this.headless,
        executablePath:this.execpath,
        //executablePath:'/opt/brave.com/brave/brave',// caminho para o brave no debian
        defaultViewport: null
      }
      this.browser = await puppeteer.launch(options);
      this.page = await this.browser.newPage();
      await this.page.goto('https://br.advfn.com/cripto/Bitcoin-BTC/visao-geral#table_more_historical', {
          timeout: 240000,
      });
      this.iniciado = true;
      callback();
    }
    else{
      callback();
    }
  }
  async capturaDados(freq, [desde, ate], callback){
    let btc_data_ = await this.page.evaluate(async function(){
      var send_data;
      var one_hour_ago = new Date(moment(new Date()).subtract(1, 'hour').format('L')).getTime()/1000;
      var one_year_ago = new Date(moment(new Date()).subtract(10, 'years').format('L')).getTime()/1000;
      var request = await fetch(`https://br.advfn.com/common/api/histo/GetHistoricalData?symbol=COIN^BTCUSD&frequency=DAILY&from=${one_year_ago}&to=${one_hour_ago}`, {
        // These properties are part of the Fetch Standard
        method: 'GET',
        headers: {
          'referer': 'https://br.advfn.com/cripto/Bitcoin-BTC/visao-geral', 'origin': 'https://br.advfn.com/cripto/Bitcoin-BTC/visao-geral', 'set-fetch-mode': 'no-cors'
        },            // Request headers. format is the identical to that accepted by the Headers constructor (see below)
        body: null,             // Request body. can be null, or a Node.js Readable stream
        redirect: 'follow',     // Set to `manual` to extract redirect headers, `error` to reject redirect
        signal: null,           // Pass an instance of AbortSignal to optionally abort requests
      
        // The following properties are node-fetch extensions
        follow: 20,             // maximum redirect count. 0 to not follow redirect
        compress: true,         // support gzip/deflate content encoding. false to disable
        size: 0,                // maximum response body size in bytes. 0 to disable
        agent: null,            // http(s).Agent instance or function that returns an instance (see below)
        highWaterMark: 16384,   // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
        insecureHTTPParser: false	// Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
      });
      send_data = await request.json();
      return send_data.result;
    });
  }

}

exports.JanelaDados = JanelaDados;