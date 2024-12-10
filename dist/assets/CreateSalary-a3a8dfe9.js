import{_ as x,b as c,c as l,d as a,e as s,j as r,F as g,m as V,f as i,t as n,i as m,g as b}from"./index-f248e178.js";const k={data(){return{validationErrors:"",errors:null,isSuccess:!1,isErrors:!1,salary:{type:"",multiply_by:"",code:"",pensionable:"",salary_period:"",salary_rate:"",description:""},dropdownValues:[{name:"Overtime",code:"Overtime"},{name:"Salary",code:"Salary"}],salaryPeriodValues:[{name:"Hour",code:"Hour"},{name:"Unit",code:"Unit"}]}},methods:{validateData(){let d=[];this.salary.type.name=="Salary"?d=["multiply_by","pensionable"]:this.salary.type.name=="Overtime"&&(d=["salary_rate","salary_period","pensionable"]),this.validationErrors=this.$validateFormData(this.salary,d),Object.keys(this.validationErrors).length===0?this.saveSalary():console.log("Validation errors:",this.validationErrors)},goBack(){this.$router.push({name:"company-salaries"})},async saveSalary(){let d=this.salary;const o="/save-salary-type";try{await this.$axios.post(o,d),this.isErrors=!1,this.isSuccess=!0,this.$showToast("success","Salary type created."),this.goBack()}catch(y){this.errors=y.response.data.errors,this.isSuccess=!1,this.isErrors=!0}}}},E={class:"col-12 md:col-12"},S={class:"card card-w-title"},w={class:"grid"},N={class:"col-12 md:col-12"},C={key:0,class:"text-center mb-5 pt-2 pb-2",style:{"background-color":"#80D1B4","border-radius":"5px !important"}},U=s("span",{class:"text-white font-medium"},"Saved Successfully",-1),B=[U],D={key:1,class:"mb-5 py-4 pl-3",style:{"background-color":"#E88D58","border-radius":"5px !important"}},L={class:"text-white font-medium"},O=s("br",null,null,-1),T={class:"formgrid grid"},F={class:"field col-4"},P=s("label",{for:"name2"},"Salary Type*",-1),j={key:0,class:"font-medium validation-text p-2"},H={class:"field col-4"},I={for:"companyName"},M={key:0,class:"font-medium validation-text p-2"},R={class:"grid"},W={class:"col-12 md:col-12"},q={class:"formgrid grid"},z={class:"field col-4"},A=s("label",{for:"companyName"},"Description",-1),G={key:0,class:"font-medium validation-text p-2"},J={key:0,class:"grid"},K={class:"col-12 md:col-12"},Q={class:"formgrid grid"},X={class:"field col-4"},Y=s("label",{for:"name2"},"Salary Period*",-1),Z={key:0,class:"font-medium validation-text p-2"},$={class:"field col-4"},ee=s("label",{for:"companyName"},"Salary Rate*",-1),se={key:0,class:"font-medium validation-text p-2"},oe={key:1,class:"grid"},te={class:"col-12 md:col-12"},le={class:"formgrid grid"},ae={class:"field col-4"},ie=s("label",{for:"companyName"},"Multiply by (Eg: 1.5)*",-1),re={key:0,class:"font-medium validation-text p-2"},ne={class:"grid"},de={class:"col-12"},ce={class:"field-checkbox mb-0"},pe=s("label",{for:"checkOption2"},"Pensionable ",-1),me=s("br",null,null,-1);function ye(d,o,y,_e,e,_){const u=c("Dropdown"),h=c("sapn"),p=c("InputText"),f=c("Checkbox"),v=c("Button");return l(),a("div",E,[s("div",S,[s("div",w,[s("div",N,[e.isSuccess?(l(),a("div",C,B)):r("",!0),e.isErrors?(l(),a("div",D,[(l(!0),a(g,null,V(e.errors,t=>(l(),a("span",L,[m(n(t)+" ",1),O]))),256))])):r("",!0),s("div",T,[s("div",F,[P,i(u,{modelValue:e.salary.type,"onUpdate:modelValue":o[0]||(o[0]=t=>e.salary.type=t),options:e.dropdownValues,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),e.validationErrors.type?(l(),a("span",j,n(e.validationErrors.type),1)):r("",!0)]),s("div",H,[s("label",I,[m("Salary item code "),i(h,{class:"text-sm"},{default:b(()=>[m("(will be shown on your payroll journal)")]),_:1})]),i(p,{modelValue:e.salary.code,"onUpdate:modelValue":o[1]||(o[1]=t=>e.salary.code=t),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),e.validationErrors.code?(l(),a("span",M,n(e.validationErrors.code),1)):r("",!0)])])])]),s("div",R,[s("div",W,[s("div",q,[s("div",z,[A,i(p,{modelValue:e.salary.description,"onUpdate:modelValue":o[2]||(o[2]=t=>e.salary.description=t),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),e.validationErrors.description?(l(),a("span",G,n(e.validationErrors.description),1)):r("",!0)])])])]),e.salary.type.name=="Salary"?(l(),a("div",J,[s("div",K,[s("div",Q,[s("div",X,[Y,i(u,{modelValue:e.salary.salary_period,"onUpdate:modelValue":o[3]||(o[3]=t=>e.salary.salary_period=t),options:e.salaryPeriodValues,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),e.validationErrors.salary_period?(l(),a("span",Z,n(e.validationErrors.salary_period),1)):r("",!0)]),s("div",$,[ee,i(p,{modelValue:e.salary.salary_rate,"onUpdate:modelValue":o[4]||(o[4]=t=>e.salary.salary_rate=t),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),e.validationErrors.salary_rate?(l(),a("span",se,n(e.validationErrors.salary_rate),1)):r("",!0)])])])])):r("",!0),e.salary.type.name=="Overtime"?(l(),a("div",oe,[s("div",te,[s("div",le,[s("div",ae,[ie,i(p,{modelValue:e.salary.multiply_by,"onUpdate:modelValue":o[5]||(o[5]=t=>e.salary.multiply_by=t),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),e.validationErrors.multiply_by?(l(),a("span",re,n(e.validationErrors.multiply_by),1)):r("",!0)])])])])):r("",!0),s("div",ne,[s("div",de,[s("div",ce,[i(f,{id:"checkOption2",name:"option",value:"pensionable",modelValue:e.salary.pensionable,"onUpdate:modelValue":o[6]||(o[6]=t=>e.salary.pensionable=t)},null,8,["modelValue"]),pe]),i(h,{class:"text-sm ml-4"},{default:b(()=>[m("(We will include this amount in the total sum used to calculate pension contributions.)")]),_:1})])]),me,i(v,{onClick:o[7]||(o[7]=t=>_.validateData()),label:"Save & Close",class:"ml-2 mb-2"}),i(v,{onClick:o[8]||(o[8]=t=>_.goBack()),label:"Cancel",class:"ml-2 mb-2"})])])}const he=x(k,[["render",ye]]);export{he as default};