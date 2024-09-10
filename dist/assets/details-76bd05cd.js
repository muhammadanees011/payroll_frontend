import{_ as f,b as m,c as d,d as l,e,f as a,t as n,j as r,p as g,k as V}from"./index-ce4bfae1.js";const b={data(){return{validationErrors:[],details:{name:"",legal_structure:"",post_code:"",address_line_1:"",address_line_2:"",city:"",director_name:"",authorized_to_act:!1,agreed_to_terms:!1},checkboxValue:[],dropdownValue:null,dropdownValues:[{name:"LTD-Private limited company",code:"NY"},{name:"LLP-Limited liability partnership",code:"RM"},{name:"LIMITED-PARTNERSHIP-Limited partnership",code:"LDN"},{name:"NORTHEREN-IRELAND-Northeren ireland company",code:"IST"},{name:"NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)",code:"PRS"},{name:"OLD-PUBLIC-COMPANY-Old public company",code:"RM"},{name:"OTHER-Other company type",code:"RM"},{name:"OVERSEA-COMPANY-Overseas company",code:"RM"},{name:"PLC-Public limited company",code:"RM"}]}},mounted(){this.getCompanyDetails()},methods:{saveDetails(){const _=["address_line_2","authorized_to_act","agreed_to_terms"];this.validationErrors=this.$validateFormData(this.details,_),Object.keys(this.validationErrors).length===0?this.$emit("saveDetails",this.details):console.log("Validation errors:",this.validationErrors)},async getCompanyDetails(){const _="/get-company-details";try{let t=await this.$axios.get(_);t=t.data,this.details.name=t.name,this.details.post_code=t.post_code,this.details.address_line_1=t.address_line_1,this.details.address_line_2=t.address_line_2,this.details.city=t.city,this.details.director_name=t.director_name,this.details.agreed_to_terms=t.agreed_to_terms==!0?["agreed_to_terms"]:[],this.details.authorized_to_act=t.authorized_to_act==!0?["authorized_to_act"]:[]}catch(t){let p=t.response.data.errors;console.log("errors",p)}}}},i=_=>(g("data-v-7cf06733"),_=_(),V(),_),x={class:"grid"},E={class:"col-12 md:col-12"},k={class:"formgrid grid"},L={class:"field col-4"},C=i(()=>e("label",{for:"companyName"},"Company/Business name*",-1)),N={key:0,class:"font-medium validation-text p-2"},w={class:"field col-4"},D=i(()=>e("label",{for:"name2"},"Legal Structure*",-1)),I={key:0,class:"font-medium validation-text p-2"},R={class:"grid"},O={class:"col-12 md:col-12"},S={class:"formgrid grid"},U={class:"field col-4"},P=i(()=>e("label",{for:"yourpostCode"},"Type your postcode",-1)),T={key:0,class:"font-medium validation-text p-2"},z={class:"field col-4"},A=i(()=>e("label",{for:"postCode"},"Postcode*",-1)),M={key:0,class:"font-medium validation-text p-2"},B={class:"grid"},H={class:"col-12 md:col-12"},Y={class:"formgrid grid"},F={class:"field col-4"},j=i(()=>e("label",{for:"address1"},"Address Line 1*",-1)),W={key:0,class:"font-medium validation-text p-2"},q={class:"field col-4"},G=i(()=>e("label",{for:"address2"},"Address Line 2",-1)),J={key:0,class:"font-medium validation-text p-2"},K={class:"grid"},Q={class:"col-12 md:col-12"},X={class:"formgrid grid"},Z={class:"field col-12"},$=i(()=>e("label",{for:"address2"},"City*",-1)),ee=i(()=>e("br",null,null,-1)),oe=i(()=>e("br",null,null,-1)),te={key:0,class:"font-medium validation-text p-2"},se=i(()=>e("h5",null,"Director / Authorised Signatory",-1)),ie=i(()=>e("p",null,"Which Director or Authorised Signatory is going up on behalf of the company?",-1)),de={class:"grid"},le={class:"col-12 md:col-12 mt-5"},ae={class:"formgrid grid"},ne={class:"field col-12"},re=i(()=>e("label",{for:"dir"},"Full Name*",-1)),_e=i(()=>e("br",null,null,-1)),ce=i(()=>e("br",null,null,-1)),me={key:0,class:"font-medium validation-text p-2"},pe=i(()=>e("p",null,"You can only setup an account for a company that you lawfully represent or work for.",-1)),ue={class:"grid"},he={class:"col-12"},ve={class:"field-checkbox mb-0"},ye=i(()=>e("label",{for:"checkOption1"},"I confirm that I'm authorised to act on behalf of the company",-1)),fe={key:0,class:"font-medium validation-text p-2 ml-4"},ge={class:"col-12"},Ve={class:"field-checkbox mb-0"},be=i(()=>e("label",{for:"checkOption2"},"I confirm that I have read and agreed the terms and conditions",-1)),xe={key:0,class:"font-medium validation-text p-2 ml-4"},Ee=i(()=>e("br",null,null,-1));function ke(_,t,p,Le,o,h){const c=m("InputText"),v=m("Dropdown"),u=m("Checkbox"),y=m("Button");return d(),l("div",null,[e("div",x,[e("div",E,[e("div",k,[e("div",L,[C,a(c,{modelValue:o.details.name,"onUpdate:modelValue":t[0]||(t[0]=s=>o.details.name=s),id:"companyName",optionLabel:"companyName",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),o.validationErrors.name?(d(),l("span",N,n(o.validationErrors.name),1)):r("",!0)]),e("div",w,[D,a(v,{modelValue:o.details.legal_structure,"onUpdate:modelValue":t[1]||(t[1]=s=>o.details.legal_structure=s),options:o.dropdownValues,optionLabel:"name",placeholder:"Select",style:{width:"100%",height:"45px"}},null,8,["modelValue","options"]),o.validationErrors.legal_structure?(d(),l("span",I,n(o.validationErrors.legal_structure),1)):r("",!0)])])])]),e("div",R,[e("div",O,[e("div",S,[e("div",U,[P,a(c,{modelValue:o.details.post_code,"onUpdate:modelValue":t[2]||(t[2]=s=>o.details.post_code=s),id:"yourpostCode",optionLabel:"yourpostCode",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),o.validationErrors.post_code?(d(),l("span",T,n(o.validationErrors.post_code),1)):r("",!0)]),e("div",z,[A,a(c,{modelValue:o.details.post_code,"onUpdate:modelValue":t[3]||(t[3]=s=>o.details.post_code=s),id:"postCode",optionLabel:"postCode",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),o.validationErrors.post_code?(d(),l("span",M,n(o.validationErrors.post_code),1)):r("",!0)])])])]),e("div",B,[e("div",H,[e("div",Y,[e("div",F,[j,a(c,{modelValue:o.details.address_line_1,"onUpdate:modelValue":t[4]||(t[4]=s=>o.details.address_line_1=s),id:"address1",optionLabel:"address1",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),o.validationErrors.address_line_1?(d(),l("span",W,n(o.validationErrors.address_line_1),1)):r("",!0)]),e("div",q,[G,a(c,{modelValue:o.details.address_line_2,"onUpdate:modelValue":t[5]||(t[5]=s=>o.details.address_line_2=s),id:"address2",optionLabel:"address2",type:"text",style:{width:"100%",height:"45px"}},null,8,["modelValue"]),o.validationErrors.address_line_2?(d(),l("span",J,n(o.validationErrors.address_line_2),1)):r("",!0)])])])]),e("div",K,[e("div",Q,[e("div",X,[e("div",Z,[$,ee,a(c,{modelValue:o.details.city,"onUpdate:modelValue":t[6]||(t[6]=s=>o.details.city=s),id:"address2",optionLabel:"address2",type:"text",style:{width:"29%",height:"45px"}},null,8,["modelValue"]),oe,o.validationErrors.city?(d(),l("span",te,n(o.validationErrors.city),1)):r("",!0)])])])]),se,ie,e("div",de,[e("div",le,[e("div",ae,[e("div",ne,[re,_e,a(c,{modelValue:o.details.director_name,"onUpdate:modelValue":t[7]||(t[7]=s=>o.details.director_name=s),id:"address2",optionLabel:"address2",type:"text",style:{width:"29%",height:"45px"}},null,8,["modelValue"]),ce,o.validationErrors.director_name?(d(),l("span",me,n(o.validationErrors.director_name),1)):r("",!0)])])])]),pe,e("div",ue,[e("div",he,[e("div",ve,[a(u,{id:"checkOption1",name:"option",value:"authorized_to_act",modelValue:o.details.authorized_to_act,"onUpdate:modelValue":t[8]||(t[8]=s=>o.details.authorized_to_act=s)},null,8,["modelValue"]),ye]),o.validationErrors.authorized_to_act?(d(),l("span",fe,n(o.validationErrors.authorized_to_act),1)):r("",!0)]),e("div",ge,[e("div",Ve,[a(u,{id:"checkOption2",name:"option",value:"agreed_to_terms",modelValue:o.details.agreed_to_terms,"onUpdate:modelValue":t[9]||(t[9]=s=>o.details.agreed_to_terms=s)},null,8,["modelValue"]),be]),o.validationErrors.agreed_to_terms?(d(),l("span",xe,n(o.validationErrors.agreed_to_terms),1)):r("",!0)])]),Ee,a(y,{onClick:t[10]||(t[10]=s=>h.saveDetails()),label:"Continue",class:"mt-5 ml-2"})])}const Ne=f(b,[["render",ke],["__scopeId","data-v-7cf06733"]]);export{Ne as default};
