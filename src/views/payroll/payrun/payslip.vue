<template>
    <div id="payslip" ref="payslip" class="payslip-container">
      <div class="header">
        <h3>Top-Payroll</h3>
        <hr />
      </div>
  
        <!-- Employee Details -->
        <div class="summary">
            <div class="row">
                <p class="employee-name"><strong>{{ employeePaySlip.name }}</strong></p>
                <p><strong>{{ employeePaySlip.company ? employeePaySlip.company.name:'' }}</strong></p>
            </div>
            <div class="row">
                <p><strong>{{ employeePaySlip.employee_address_line1 }}</strong></p>
                <p><strong>{{ employeePaySlip.company ? employeePaySlip.company.address_line_1 :''}}</strong></p>
            </div>
            <div class="row">
                <p><strong>{{ employeePaySlip.employee_address_line2 }}, {{ employeePaySlip.employee_city }}</strong></p>
                <p><strong>{{ employeePaySlip.company ? employeePaySlip.company.address_line_2:'' }}</strong></p>
            </div>
            <div class="row">
                <p></p>
                <p><strong>{{ employeePaySlip.company ? employeePaySlip.company.postcode:'' }}, {{ employeePaySlip.company ? employeePaySlip.company.city :''}}</strong></p>
            </div>
        </div>
  
      <!-- Summary Section -->
      <div class="summary">
        <div class="row">
          <p><span>Payroll ID:</span> <strong>{{ employeePaySlip.employee_payrollId}}</strong></p>
          <p><span>Tax Code:</span> <strong>{{ employeePaySlip.tax_code }}</strong></p>
        </div>
        <!-- <div class="row">
          <p><span>Tax Code:</span> <strong>1257L</strong></p>
          <p></p>
        </div> -->
        <div class="row">
          <p><span>NI Number:</span> <strong>{{ employeePaySlip.employee_nino }}</strong></p>
          <p><span>NI Category:</span> <strong>{{ employeePaySlip.ni_category }}</strong></p>
        </div>
        <!-- <div class="row">
          <p><span>NI Category:</span> <strong>A</strong></p>
          <p></p>
        </div> -->
        <div class="row">
            <p><span class="label">Tax Period:</span> <strong>{{ employeePaySlip.tax_period }}</strong></p>
          <p><span class="label">Net Pay:</span> {{ formatCurrency(employeePaySlip.net_pay) }}</p>
        </div>
        <div class="row">
            <p>{{ $moment(employeePaySlip.pay_run_start_date).format('DD/MM/YYYY') }} - {{ $moment(employeePaySlip.pay_run_end_date).format('DD/MM/YYYY') }}</p>
            <p>{{ $moment(employeePaySlip.pay_date).format('DD/MM/YYYY') }}</p>
        </div>
      </div>
  
      <!-- Table Section -->
      <div class="table-section">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Basis</th>
              <th>Rate</th>
              <th>Addition/Deduction</th>
              <th>(SUB)Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base Pay</td>
              <td>{{ formatCurrency(employeePaySlip.base_pay) }}</td>
              <td></td>
              <td></td>
              <td>{{ formatCurrency(employeePaySlip.base_pay) }}</td>
            </tr>
            <tr v-if="employeePaySlip.pg_loan">
              <td>PG Student Loan</td>
              <td></td>
              <td></td>
              <td>- {{ formatCurrency(employeePaySlip.pg_loan) }}</td>
              <td>{{ formatCurrency(employeePaySlip.base_pay - employeePaySlip.pg_loan) }}</td>
            </tr>
            <tr v-if="employeePaySlip.student_loan">
              <td>Student Loan</td>
              <td></td>
              <td></td>
              <td>- {{ formatCurrency(employeePaySlip.student_loan) }}</td>
              <td>{{ formatCurrency((employeePaySlip.base_pay) - (employeePaySlip.pg_loan + employeePaySlip.student_loan)) }}</td>
            </tr>
            <tr>
              <td>Employee NIC</td>
              <td></td>
              <td>{{ employeePaySlip.ni_category }}</td>
              <td>- {{ formatCurrency(employeePaySlip.employee_nic) }}</td>
              <td>{{ formatCurrency(employeePaySlip.base_pay - (employeePaySlip.pg_loan + employeePaySlip.student_loan + employeePaySlip.employee_nic)) }}</td>
            </tr>
            <tr>
              <td>PAYE Income Tax</td>
              <td></td>
              <td>{{ employeePaySlip.tax_code }}</td>
              <td>- {{ formatCurrency(employeePaySlip.paye_income_tax) }}</td>
              <td>{{ formatCurrency(employeePaySlip.base_pay - (employeePaySlip.pg_loan + employeePaySlip.student_loan + employeePaySlip.employee_nic + employeePaySlip.paye_income_tax)) }}</td>
            </tr>
            <tr>
              <td>Employee Pension</td>
              <td></td>
              <td></td>
              <td>- {{ formatCurrency(employeePaySlip.employee_pension) }}</td>
              <td>{{ formatCurrency(employeePaySlip.base_pay -  (employeePaySlip.pg_loan + employeePaySlip.student_loan + employeePaySlip.employee_nic + employeePaySlip.paye_income_tax + employeePaySlip.employee_pension)) }}</td>
            </tr>
            <tr v-for="(item,index) in employeePaySlip.payitems" :key="index">
              <td>{{ item.payitem.name }}</td>
              <td></td>
              <td></td>
              <td>{{ item.amount }}</td>
              <td>{{ calculateSubTotal(index) }}</td>
            </tr>
            <tr v-if="employeePaySlip.sick_pay">
              <td>Statutory Sick Pay</td>
              <td></td>
              <td></td>
              <td> {{ formatCurrency(employeePaySlip.sick_pay) }}</td>
              <td>{{ formatCurrency((employeePaySlip.base_pay + employeePaySlip.sick_pay) -  (employeePaySlip.pg_loan + employeePaySlip.student_loan + employeePaySlip.employee_nic + employeePaySlip.paye_income_tax + employeePaySlip.employee_pension)) }}</td>
            </tr>
            <tr v-if="employeePaySlip.paternity_pay">
              <td>Paternity Pay</td>
              <td></td>
              <td></td>
              <td> {{ formatCurrency(employeePaySlip.paternity_pay) }}</td>
              <td>{{ formatCurrency((employeePaySlip.base_pay + employeePaySlip.sick_pay + employeePaySlip.paternity_pay) -  (employeePaySlip.pg_loan + employeePaySlip.student_loan + employeePaySlip.employee_nic + employeePaySlip.paye_income_tax + employeePaySlip.employee_pension)) }}</td>
            </tr>
            <tr>
              <td>Net Pay</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ formatCurrency(employeePaySlip.net_pay) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Totals Section -->
      <div class="totals-container">
        <!-- Employee Totals -->
        <div class="table-section">
          <table>
            <thead>
              <tr>
                <th>Employees Total</th>
                <th>This Period</th>
                <th>Years Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gross Earnings</td>
                <td>{{ formatCurrency(employeePaySlip.gross_pay) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.gross_earnings_this_year:0) }}</td>
              </tr>
              <tr>
                <td>Taxable Earnings</td>
                <td>£1,000.00</td>
                <td>£1,000.00</td>
              </tr>
              <tr>
                <td>Employee NIC</td>
                <td>{{ formatCurrency(employeePaySlip.employee_nic) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.employee_nic_this_year:0) }}</td>
              </tr>
              <tr>
                <td>PAYE Income Tax</td>
                <td>{{ formatCurrency(employeePaySlip.paye_income_tax) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.paye_income_tax_this_year:0) }}</td>
              </tr>
              <tr>
                <td>Employee Pension</td>
                <td>{{ formatCurrency(employeePaySlip.employee_pension) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.employee_pension_this_year:0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Employer Totals -->
        <div class="table-section">
          <table>
            <thead>
              <tr>
                <th>Employers Total</th>
                <th>This Period</th>
                <th>Years Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employer NIC</td>
                <td>{{ formatCurrency(employeePaySlip.employer_nic) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.employer_nic_this_year:0) }}</td>
              </tr>
              <tr>
                <td>Employer Pension</td>
                <td>{{ formatCurrency(employeePaySlip.employer_pension) }}</td>
                <td>{{ formatCurrency(employeePaySlip.yearlyEarnings ? employeePaySlip.yearlyEarnings.employer_pension_this_year:0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
      employeePaySlip: {
        type: Object,
        required: true,
      },
    },
    mounted(){
    },
    data() {
      return {
      };
    },
    methods:{
      //-----------FORMAT THE AMOUNT-----------
      formatCurrency(value) {
        if(value !== null && value !== undefined){
          return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'GBP',
          });
        }
      },

      //-----------CALCULATE SUB TOTAL FOR PAYITEMS-----------
      calculateSubTotal(itemIndex){
        let subTotal=this.employeePaySlip.base_pay - (this.employeePaySlip.pg_loan + this.employeePaySlip.student_loan + this.employeePaySlip.employee_pension + this.employeePaySlip.paye_income_tax + this.employeePaySlip.employee_nic);
        this.employeePaySlip.payitems.filter((item,index)=>{
          if(itemIndex<=index){
            subTotal=subTotal+item.amount
          }
        })

        return this.formatCurrency(subTotal)
      }
    }
  };
  </script>
  
  <style scoped>
  /* Overall Styling */
  .payslip-container {
    font-family: Arial, sans-serif;
    color: #000;
    background-color: #fff;
    padding: 20px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    line-height: 1.3; /* Reduced line height for tighter spacing */
  }
  
  /* Header */
  .header h3 {
    font-size: 15px;
    font-weight: bold;
    text-align: start;
    margin-bottom: 10px;
  }
  
  hr {
    margin: 10px 0;
  }
  
  /* Two-column Layout */
  .details-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .details-container > div {
    width: 48%;
  }
  
  .summary{
    margin-top: 25px;
  }
  /* Summary Rows */
  .summary .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px; /* Reduced space between rows */
  }
  
  .summary .label {
    font-weight: bold;
  }
  
  /* Table Section */
  .table-section table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 12px;
  }
  
  .table-section th,
  .table-section td {
    text-align: left;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .table-section td{
    border-bottom: 1px solid #ccc;
  }

  .table-section tr{
    background-color: #F4F1F1;
  }
  
  .table-section th {
    background-color: #4CAF50; /* Dark Green header */
    color: white;
    font-weight: bold;
  }
  
/* Totals Section */
.totals-container {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    width: 100%;
}

.totals-container > .table-section {
    width: 49%; /* Each child will occupy 48% of the width */
}

.totals-container {
    gap: 2%; /* This will create a 4% gap between the two children */
}
  
  .totals {
    width: 49%;
  }
  
  .totals h4 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .totals .label {
    font-weight: bold;
    font-size: 12px;
  }

  p{
    line-height: 7px;
    font-size: 13px;
  }
  </style>
  