import{_ as x,b as c,c as n,d as a,e,j as d,F as k,m as V,f as l,t as u,i,g as p}from"./index-22bf9e45.js";const g={data(){return{validationErrors:"",errors:null,isSuccess:!1,isErrors:!1,payItem:{name:"",code:"",is_benefit_in_kind:"",taxable:"",pensionable:"",subject_to_national_insurance:"",payment_type:""},dropdownValues:[{name:"Gross Addition",code:"Gross Addition"},{name:"Gross Deduction",code:"Gross Deduction"},{name:"Net Addition",code:"Net Addition"},{name:"Net Deduction",code:"Net Deduction"}]}},methods:{validateData(){const r=["taxable","pensionable","subject_to_national_insurance","is_benefit_in_kind"];this.validationErrors=this.$validateFormData(this.payItem,r),Object.keys(this.validationErrors).length===0?this.savePayItem():console.log("Validation errors:",this.validationErrors)},goBack(){this.$router.push({name:"company-payitems"})},async savePayItem(){let r=this.payItem;const o="/save-pay-item";try{await this.$axios.post(o,r),this.$showToast("success","Pay Item created successfully."),this.isErrors=!1,this.isSuccess=!0,this.goBack()}catch(h){this.errors=h.response.data.errors,this.isSuccess=!1,this.isErrors=!0}}}},I={class:"col-12 md:col-12"},w={class:"card card-w-title"},E={class:"grid"},N={class:"col-12 md:col-12"},D={key:0,class:"text-center mb-5 pt-2 pb-2",style:{"background-color":"#80D1B4","border-radius":"5px !important"}},C=e("span",{class:"text-white font-medium"},"Saved Successfully",-1),S=[C],j={key:1,class:"mb-5 py-4 pl-3",style:{"background-color":"#E88D58","border-radius":"5px !important"}},B={class:"text-white font-medium"},P=e("br",null,null,-1),O={class:"formgrid grid"},U={class:"field col-4"},T=e("label",{for:"companyName"},"Pay item name*",-1),A={key:0,class:"font-medium validation-text p-2"},F={class:"field col-4"},G={for:"companyName"},L={key:0,class:"font-medium validation-text p-2"},W={class:"grid"},q={class:"col-12 md:col-12"},z={class:"formgrid grid"},H={class:"field col-4"},J=e("label",{for:"name2"},"Payment Type*",-1),K={key:0,class:"font-medium validation-text p-2"},M=e("p",null,"Pay items( Select all that apply )",-1),Q={class:"grid"},R={class:"col-12"},X={class:"field-checkbox mb-0"},Y=e("label",{for:"checkOption1l",class:"text-lg"},"Taxable ",-1),Z={class:"col-12"},$={class:"field-checkbox mb-0"},ee=e("label",{for:"checkOption2",class:"text-lg"},"Subject to National Insurance",-1),te={class:"col-12"},oe={class:"field-checkbox mb-0"},se=e("label",{for:"checkOption2"},"Pensionable ",-1),le=e("br",null,null,-1);function ne(r,o,h,ae,t,y){const b=c("InputText"),m=c("sapn"),f=c("Dropdown"),_=c("Checkbox"),v=c("Button");return n(),a("div",I,[e("div",w,[e("div",E,[e("div",N,[t.isSuccess?(n(),a("div",D,S)):d("",!0),t.isErrors?(n(),a("div",j,[(n(!0),a(k,null,V(t.errors,s=>(n(),a("span",B,[i(u(s)+" ",1),P]))),256))])):d("",!0),e("div",O,[e("div",U,[T,l(b,{modelValue:t.payItem.name,"onUpdate:modelValue":o[0]||(o[0]=s=>t.payItem.name=s),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),t.validationErrors.name?(n(),a("span",A,u(t.validationErrors.name),1)):d("",!0)]),e("div",F,[e("label",G,[i("Pay item code "),l(m,{class:"text-sm"},{default:p(()=>[i("(will be shown on your payroll journal)")]),_:1})]),l(b,{modelValue:t.payItem.code,"onUpdate:modelValue":o[1]||(o[1]=s=>t.payItem.code=s),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),t.validationErrors.code?(n(),a("span",L,u(t.validationErrors.code),1)):d("",!0)])])])]),e("div",W,[e("div",q,[e("div",z,[e("div",H,[J,l(f,{modelValue:t.payItem.payment_type,"onUpdate:modelValue":o[2]||(o[2]=s=>t.payItem.payment_type=s),options:t.dropdownValues,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),t.validationErrors.payment_type?(n(),a("span",K,u(t.validationErrors.payment_type),1)):d("",!0)])])])]),M,e("div",Q,[e("div",R,[e("div",X,[l(_,{id:"checkOption1",name:"option",value:"taxable",modelValue:t.payItem.taxable,"onUpdate:modelValue":o[3]||(o[3]=s=>t.payItem.taxable=s)},null,8,["modelValue"]),Y]),l(m,{class:"text-sm ml-4"},{default:p(()=>[i("(We will include this amount in the total sum used to calculate income tax.)")]),_:1})]),e("div",Z,[e("div",$,[l(_,{id:"checkOption2",name:"option",value:"subject_to_national_insurance",modelValue:t.payItem.subject_to_national_insurance,"onUpdate:modelValue":o[4]||(o[4]=s=>t.payItem.subject_to_national_insurance=s)},null,8,["modelValue"]),ee]),l(m,{class:"text-sm ml-4"},{default:p(()=>[i("(We will include this amount in the total sum used to calculate national insurance.)")]),_:1})]),e("div",te,[e("div",oe,[l(_,{id:"checkOption2",name:"option",value:"pensionable",modelValue:t.payItem.pensionable,"onUpdate:modelValue":o[5]||(o[5]=s=>t.payItem.pensionable=s)},null,8,["modelValue"]),se]),l(m,{class:"text-sm ml-4"},{default:p(()=>[i("(We will include this amount in the total sum used to calculate pension contributions.)")]),_:1})])]),le,l(v,{onClick:y.validateData,label:"Save & Close",class:"ml-2 mb-2"},null,8,["onClick"]),l(v,{onClick:o[6]||(o[6]=s=>y.goBack()),label:"Cancel",class:"ml-2 mb-2"})])])}const ce=x(g,[["render",ne]]);export{ce as default};
