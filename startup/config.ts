function config(app : any  , express : any) : void {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(express.static('public'));
}

export default config;