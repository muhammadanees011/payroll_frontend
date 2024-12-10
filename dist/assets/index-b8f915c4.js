import{_ as u,b as h,c as o,d as l,e,F as y,m as x,f,h as b,t as c,j as r,p as v,k as g}from"./index-f248e178.js";const w={data(){return{salaries:""}},mounted(){this.getSalaries()},methods:{addPayItems(){this.$router.push({name:"company-create-salaries"})},async getSalaries(){const t="/get-salary-type";try{let a=await this.$axios.get(t);this.salaries=a.data}catch(a){a.response.data.errors}},async removeSalary(t){if(!await this.$showConfirmation())return;const n="/remove-salary-type/"+t;try{await this.$axios.get(n),this.$showToast("success","Salary type removed."),this.getSalaries()}catch(i){i.response.data.errors}}}},p=t=>(v("data-v-eb7ec82a"),t=t(),g(),t),k={class:"col-12 md:col-12"},S={class:"card card-w-title"},C={class:"grid"},$={class:"col-12 md:col-6"},I={class:"flex flex-column align-items-center justify-content-center"},B={class:"w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center",style:{"border-radius":"53px"}},j={class:"mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1"},N={class:"ml-4 mt-3 flex flex-column"},V={class:"text-900 lg:text-xl font-medium mb-0 block"},F={key:0,class:"text-500 lg:text-sm"},R={key:1,class:"text-500 lg:text-sm"},U={class:"mt-4 flex",style:{height:"3.5rem",width:"6.5rem",position:"relative"}},P={key:0,class:"text-900 lg:text-xl font-medium mb-0 block"},T={key:1,class:"text-900 lg:text-xl font-medium mb-0 block"},A={class:"dropdown ml-2"},D=p(()=>e("button",{class:"dropdown-btn"},"⋮",-1)),E={class:"dropdown-content"},H=["onClick"],L=p(()=>e("br",null,null,-1)),X=b('<div class="col-12 md:col-6" data-v-eb7ec82a><div class="flex flex-column align-items-center justify-content-center" data-v-eb7ec82a><div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius:53px;" data-v-eb7ec82a><div class="w-full flex align-items-center py-5 border-300 border-bottom-1" data-v-eb7ec82a><span class="ml-4 flex flex-column" data-v-eb7ec82a><span class="lg:text-xl font-medium mb-0 block" style="color:#1F9A72;" data-v-eb7ec82a>Salaries</span><span class="lg:text-sm" data-v-eb7ec82a>Set up Company specific salaries and choose if they should be calculated on hours or units.</span></span></div></div></div></div>',1);function q(t,a,n,i,_,d){const m=h("Button");return o(),l("div",k,[e("div",S,[e("div",C,[e("div",$,[e("div",I,[e("div",B,[(o(!0),l(y,null,x(_.salaries,s=>(o(),l("div",j,[e("span",N,[e("h3",V,c(s.description),1),s.salary_period=="hour"||s.salary_period==null?(o(),l("span",F,"Rate per Hour")):r("",!0),s.salary_period=="unit"?(o(),l("span",R,"Rate per Unit")):r("",!0)]),e("div",U,[s.salary_rate?(o(),l("h3",P,"£"+c(s.salary_rate),1)):r("",!0),s.multiply_by?(o(),l("h3",T,c(s.multiply_by)+"X",1)):r("",!0),e("div",A,[D,e("div",E,[e("a",{onClick:z=>d.removeSalary(s.id),href:"#"},"Remove",8,H)])])])]))),256)),L,f(m,{onClick:a[0]||(a[0]=s=>d.addPayItems()),icon:"pi pi-plus",label:"Create Salary Type",class:"ml-2 mb-2"})])])]),X])])])}const J=u(w,[["render",q],["__scopeId","data-v-eb7ec82a"]]);export{J as default};