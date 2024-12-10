import{_ as g,b as p,c as d,d as l,e as o,j as n,F as b,m as k,f as c,t as y,i as u,p as w,k as x}from"./index-f248e178.js";const V={data(){return{validationErrors:[],errors:null,isSuccess:!1,isErrors:!1,paySchedule:{name:"",pay_frequency:"",paydays:"",first_paydate:"",day_rate_method:""},checkboxValue:[],dropdownValue:null,dropdownValues:[{name:"Weekly",code:"Weekly"},{name:"Fortnightly",code:"Fortnightly"},{name:"Four Weekly",code:"Four"},{name:"Monthly",code:"Monthly"}],payDays:[{name:"Monday",code:"Monday"},{name:"Tuesday",code:"Tuesday"},{name:"Wednesday",code:"Wednesday"},{name:"Thursday",code:"Thursday"},{name:"Friday",code:"Friday"}],dayRatemethod:[{name:"Calander Month",code:"Calander Month"},{name:"Yearly Working Days",code:"Yearly Working Days"}]}},mounted(){this.editPaySchedule()},methods:{goBack(){this.$router.push({name:"company-pay-schedules"})},validateData(){const i=[];this.validationErrors=this.$validateFormData(this.paySchedule,i),Object.keys(this.validationErrors).length===0?this.updatePaySchedule():console.log("Validation errors:",this.validationErrors)},async editPaySchedule(){const t="/edit-pay-schedule/"+this.$route.params.id;try{let s=await this.$axios.get(t);s=s.data,this.paySchedule.name=s.name,this.paySchedule.pay_frequency={name:s.pay_frequency,code:s.pay_frequency},this.paySchedule.paydays={name:s.paydays,code:s.paydays},this.paySchedule.first_paydate=s.first_paydate,this.paySchedule.day_rate_method={name:s.day_rate_method,code:s.day_rate_method}}catch(s){s.response.data.errors}},async updatePaySchedule(){this.paySchedule.first_paydate=this.$moment(this.paySchedule.first_paydate).format("YYYY-MM-DD");let i=this.paySchedule;const s="/update-pay-schedule/"+this.$route.params.id;try{await this.$axios.post(s,i),this.$showToast("success","Pay Schedule updated successfully."),this.isErrors=!1,this.isSuccess=!0,this.goBack()}catch(_){this.errors=_.response.data.errors,this.isSuccess=!1,this.isErrors=!0}}}},r=i=>(w("data-v-35afb15d"),i=i(),x(),i),E={class:"col-12 md:col-12"},D={class:"card card-w-title"},B=r(()=>o("h5",null,"Why do we need to ask for this?",-1)),F=r(()=>o("small",{class:""},[u("Pay schedules refer to the regular intervals at which your workers receive their wages or salaries. "),o("br"),u("In other words, it is how often you pay them. You can set up more than one pay schedule, but each worker can be assigned to only one pay schedule.")],-1)),P={key:0,class:"text-center mb-5 pt-2 pb-2",style:{"background-color":"#80D1B4","border-radius":"5px !important"}},q=r(()=>o("span",{class:"text-white font-medium"},"Saved Successfully",-1)),C=[q],I={key:1,class:"mb-5 py-4 pl-3",style:{"background-color":"#E88D58","border-radius":"5px !important"}},M={class:"text-white font-medium"},T=r(()=>o("br",null,null,-1)),W={class:"grid mt-3"},N={class:"col-12 md:col-12"},U={class:"formgrid grid"},Y={class:"field col-4"},L=r(()=>o("label",{for:"companyName"},"Schedule name*",-1)),j={key:0,class:"font-medium validation-text p-2"},R={class:"field col-4"},O=r(()=>o("label",{for:"name2"},"Pay frequency*",-1)),z={key:0,class:"font-medium validation-text p-2"},A={class:"grid"},G={class:"col-12 md:col-12"},H={class:"formgrid grid"},J={class:"field col-4"},K=r(()=>o("label",{for:"name2"},"Pay days*",-1)),Q={key:0,class:"font-medium validation-text p-2"},X={class:"field col-4"},Z=r(()=>o("label",{for:"name2"},"First Payday*",-1)),$={key:0,class:"font-medium validation-text p-2"},ee={class:"grid"},oe={class:"col-12 md:col-12"},te={class:"formgrid grid"},se={class:"field col-4"},ae=r(()=>o("label",{for:"name2"},"Day rate method*",-1)),de={key:0,class:"font-medium validation-text p-2"},le=r(()=>o("br",null,null,-1));function re(i,t,s,_,e,m){const v=p("InputText"),h=p("Dropdown"),S=p("Calendar"),f=p("Button");return d(),l("div",E,[o("div",D,[B,F,e.isSuccess?(d(),l("div",P,C)):n("",!0),e.isErrors?(d(),l("div",I,[(d(!0),l(b,null,k(e.errors,a=>(d(),l("span",M,[u(y(a)+" ",1),T]))),256))])):n("",!0),o("div",W,[o("div",N,[o("div",U,[o("div",Y,[L,c(v,{modelValue:e.paySchedule.name,"onUpdate:modelValue":t[0]||(t[0]=a=>e.paySchedule.name=a),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),e.validationErrors.name?(d(),l("span",j,y(e.validationErrors.name),1)):n("",!0)]),o("div",R,[O,c(h,{modelValue:e.paySchedule.pay_frequency,"onUpdate:modelValue":t[1]||(t[1]=a=>e.paySchedule.pay_frequency=a),options:e.dropdownValues,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),e.validationErrors.pay_frequency?(d(),l("span",z,y(e.validationErrors.pay_frequency),1)):n("",!0)])])])]),o("div",A,[o("div",G,[o("div",H,[o("div",J,[K,c(h,{modelValue:e.paySchedule.paydays,"onUpdate:modelValue":t[2]||(t[2]=a=>e.paySchedule.paydays=a),options:e.payDays,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),e.validationErrors.paydays?(d(),l("span",Q,y(e.validationErrors.paydays),1)):n("",!0)]),o("div",X,[Z,c(S,{showIcon:!0,showButtonBar:!0,modelValue:e.paySchedule.first_paydate,"onUpdate:modelValue":t[3]||(t[3]=a=>e.paySchedule.first_paydate=a),style:{width:"100%"}},null,8,["modelValue"]),e.validationErrors.first_paydate?(d(),l("span",$,y(e.validationErrors.first_paydate),1)):n("",!0)])])])]),o("div",ee,[o("div",oe,[o("div",te,[o("div",se,[ae,c(h,{modelValue:e.paySchedule.day_rate_method,"onUpdate:modelValue":t[4]||(t[4]=a=>e.paySchedule.day_rate_method=a),options:e.dayRatemethod,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),e.validationErrors.day_rate_method?(d(),l("span",de,y(e.validationErrors.day_rate_method),1)):n("",!0)])])])]),le,c(f,{onClick:t[5]||(t[5]=a=>m.validateData()),label:"Save",class:"mt-5 ml-2"}),c(f,{onClick:t[6]||(t[6]=a=>m.goBack()),label:"Cancel",class:"mt-5 ml-2",style:{"background-color":"transparent",color:"black"}})])])}const ne=g(V,[["render",re],["__scopeId","data-v-35afb15d"]]);export{ne as default};