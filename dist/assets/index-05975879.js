import{_ as S,b as h,c as y,d as C,e as p,f as a,g as i,i as k,t as b,n as g,l as m,j as f}from"./index-22bf9e45.js";const v={data(){return{paySchedules:""}},mounted(){this.getPaySchedules()},methods:{formatCurrency(t){return`$${t.toFixed(2)}`},newPaySchedule(){this.$router.push({name:"company-create-pay-schedules"})},async getPaySchedules(){const t="/get-pay-schedule";try{let s=await this.$axios.get(t);this.paySchedules=s.data}catch(s){s.response.data.errors}},async deletePaySchedule(t){if(!await this.$showConfirmation())return;const o="/delete-pay-schedule/"+t;try{let n=await this.$axios.get(o);this.$showToast("success","Pay Schedule deleted successfully."),this.getPaySchedules()}catch(n){n.response.data.errors}},async changeStatus(t,s){const o="/status-pay-schedule/"+s;let n={status:t};try{let d=await this.$axios.post(o,n);this.$showToast("success","Status updated successfully."),this.getPaySchedules()}catch(d){d.response.data.errors}},editPaySchedule(t){this.$router.push({name:"company-edit-pay-schedules",params:{id:t}})}}},w={class:"p-3"},$={style:{display:"flex"},class:"justify-content-between align-content-end"},x=p("h5",null,"Pay Schedules",-1);function N(t,s,o,n,d,l){const r=h("Button"),c=h("Column"),_=h("DataTable");return y(),C("div",w,[p("div",$,[x,a(r,{onClick:s[0]||(s[0]=e=>l.newPaySchedule()),icon:"pi pi-plus",label:"New Pay Schedule",class:"mr-2 mb-2"})]),a(_,{value:d.paySchedules},{default:i(()=>[a(c,{field:"id",header:"Id",sortable:!0}),a(c,{field:"name",header:"Name",sortable:!0}),a(c,{field:"pay_frequency",header:"Frequency",sortable:!0}),a(c,{field:"amount",header:"N Of Employees",sortable:!0},{body:i(e=>[k(" N/A ")]),_:1}),a(c,{field:"status",header:"Status",sortable:!0},{body:i(e=>[p("span",{class:g("order-badge order-"+(e.data.status?e.data.status.toLowerCase():""))},b(e.data.status),3)]),_:1}),a(c,{header:"Action"},{body:i(e=>[e.data.status=="Active"?(y(),m(r,{key:0,onClick:u=>l.changeStatus("Inactive",e.data.id),icon:"pi pi-check-circle"},null,8,["onClick"])):f("",!0),e.data.status=="Inactive"?(y(),m(r,{key:1,onClick:u=>l.changeStatus("Active",e.data.id),icon:"pi pi-check-circle",style:{"background-color":"white",color:"green"}},null,8,["onClick"])):f("",!0),a(r,{onClick:u=>l.editPaySchedule(e.data.id),icon:"pi pi-pencil",class:"ml-2"},null,8,["onClick"]),a(r,{onClick:u=>l.deletePaySchedule(e.data.id),icon:"pi pi-trash",class:"ml-2"},null,8,["onClick"])]),_:1})]),_:1},8,["value"])])}const B=S(v,[["render",N]]);export{B as default};