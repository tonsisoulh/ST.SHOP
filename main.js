<details open><summary>scripts/main.js</summary>
/* ----------  تخزين بلـ localStorage ---------- */
const STORAGE={
  get:k=>JSON.parse(localStorage.getItem(k)||'[]'),
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};

/* ----------  المنتجات ---------- */
const PRODUCTSF='products';
const ORDERSF='orders';
const Product={
  all(){return STORAGE.get(PRODUCTSF)},
  save(p){const a=this.all();let i=a.findIndex(x=>x.id===p.id);if(i>-1)a[i]=p;else a.push(p);STORAGE.set(PRODUCTSF,a)},
  remove(id){STORAGE.set(PRODUCTSF,this.all().filter(p=>p.id!==id))}
};
const Order={
  all(){return STORAGE.get(ORDERSF)},
  add(o){STORAGE.set(ORDERSF,[...this.all(),o])}
};

/* ----------  السلة ---------- */
const CARTF='cart';
const Cart={
  all(){return STORAGE.get(CARTF)},
  add(p){const a=this.all();let i=a.findIndex(x=>x.id===p.id);if(i>-1)a[i].qty+=1;else a.push({...p,qty:1});STORAGE.set(CARTF,a)},
  remove(id){STORAGE.set(CARTF,this.all().filter(p=>p.id!==id))},
  changeQty(id,delta){const a=this.all();const o=a.find(x=>x.id===id);if(o){o.qty+=delta;if(o.qty<1)o.qty=1}STORAGE.set(CARTF,a)},
  empty(){localStorage.removeItem(CARTF)},
  total(){return this.all().reduce((s,i)=>s+i.price*i.qty,0)},
  weight(){return this.all().reduce((s,i)=>s+(i.weight||0)*i.qty,0)},
  count(){return this.all().reduce((s,i)=>s+i.qty,0)}
};

/* ----------  سعر التوصيل ---------- */
function shippingRange(weight,point){ // weight is ignored: flat cost
  if(point==='office'){ return {min:60000,max:60000} }
  else{ return {min:90000,max:90000} }
}

/* ----------  المصادقة للمدير ---------- */
const ADMIN={user:'admin',pass:'Tonsiaimn2026'};
function isLogged(){ return sessionStorage.getItem('adminLogged')==='true'; }
function requireLogin(page){ if(!isLogged()){ sessionStorage.clear(); window.location.href=`/admin/login.html?next=${encodeURIComponent(page)}`; } }
function logout(){ sessionStorage.removeItem('adminLogged'); window.location.href='/admin/login.html'; }

/* ----------  مساعدة عامة ---------- */
function toCurrency(v){ return v.toLocaleString('ar-DZ')+' دج'; }
function toast(msg,cls='bg-success'){
  const d=document.createElement('div');
  d.className=`toast align-items-center text-bg-${cls} border-0`;
  d.style=`position:fixed;bottom:20px;right:20px;z-index:1050;animation:fadein .3s`;
  d.innerHTML=`<div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle"></i> ${msg}</div></div>`;
  document.body.appendChild(d);
  setTimeout(()=>d.remove(),4500);
}
</details>