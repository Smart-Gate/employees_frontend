<template>
  <div>
    <v-banner>
      <h3>Employees Managment</h3>
    </v-banner>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-btn
          @click="
            [
                (GetCompaniesAPI()),
              (Employee.Type = 'Create'),
              (Employee.Open = true),
              (Employee.Item = {}),
            ]
          "
        >
          <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="Employee.Open" width="90vw">
      <v-container class="background pa-3" fluid>
        <v-form ref="InputForm" lazy-validation>
          <v-card flat>
            <v-card-title>
              <v-row align="center" justify="start" class="my-0 mx-1 caption">
                <h1 class="font-weight-regular">
                  <v-icon large>mdi-pencil-plus-outline</v-icon>
                  {{ Employee.Type }}
                </h1>
              </v-row>
            </v-card-title>
            <v-divider />
            <v-text-field
              label="First Name"
              filled
              rounded
              prepend-inner-icon="mdi-star"
              v-model="Employee.Item.first_name"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              filled
              rounded
              prepend-inner-icon="mdi-star"
              v-model="Employee.Item.last_name"
            ></v-text-field>
            <v-text-field
              label="Email"
              filled
              rounded
              prepend-inner-icon="mdi-star"
              v-model="Employee.Item.email"
            ></v-text-field>
            <v-select
              :items="Companies"
              item-value="id"
              label="Select"
              item-text="name"
              v-model = "Employee.Item.company_id"
            ></v-select>
            <v-divider />
            <v-card-actions>
              <v-row align="center" justify="center" class="my-1">
                <v-btn
                  large
                  class="mx-2 mt-3"
                  color="error"
                  @click="
                    [
                      (Employee.Type = ''),
                      (Employee.Open = false),
                      (Employee.Item = {}),
                      GetEmployeesAPI(),
                    ]
                  "
                  rounded
                >
                  <v-icon color="white">mdi-close-circle-outline</v-icon>
                  Cancle
                </v-btn>
                <v-btn
                  large
                  class="mx-2 mt-3"
                  color="success"
                  rounded
                  @click="Submit(Employee.Item)"
                >
                  <v-icon color="white">mdi-content-save-all-outline</v-icon>
                  Save
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </v-dialog>
    <v-data-table :headers="Employees.headers" :items="Employees.Items">
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="
            [
            (GetCompaniesAPI()),
              (Employee.Type = 'Edit'),
              (Employee.Open = true),
              (Employee.Item = item),
            ]
          "
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="Delete(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import GeneralClasses from "@/SubClasses/GeneralClasses";
export default {
  name: "EmployeesView",
  data() {
    return {
      GeneralClasses: GeneralClasses,
      Companies: [],
      Employees: {
        Items: [],
        headers: [
          {
            text: "ID",
            align: "start",
            value: "id",
          },
          { text: "First Name", value: "first_name" },
          { text: "Last Name", value: "last_name" },
          { text: "Email", value: "email" },
          { text: "Company ID", value: "company_id" },
          { text: "Created at", value: "created_at" },
          { text: "Updated at", value: "updated_at" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      },
      Employee: {
        Open: false,
        Item: {},
        Type: "",
      },
    };
  },
  methods: {
    GetEmployeesAPI: function () {
      this.Employees.Items = [];
      this.$http
        .get(GeneralClasses.Domain() + "/api/employee")
        .then((Result) => {
          this.Employees.Items = Result.data.data;
        });
    },
    GetCompaniesAPI: function () {
      this.Employees.Items = [];
      this.$http
        .get(GeneralClasses.Domain() + "/api/company")
        .then((Result) => {
          this.Companies = Result.data.data;
        });
    },
    Delete(Item) {
      this.$http
        .delete(GeneralClasses.Domain() + "/api/employee/" + Item.id)
        .then((Result) => {
          this.GetEmployeesAPI();
        });
    },
    Submit(Item) {
      var Source =
        this.Employee.Type == "Edit"
          ? this.GeneralClasses.Domain() + "/api/employee/" + Item.id
          : this.GeneralClasses.Domain() + "/api/employee";

      this.$http.post(Source, this.Employee.Item).then((Result) => {
        this.GetEmployeesAPI();
        this.Employee.Open = false;
        this.Employee.Item = {};
        this.Employee.Type = "";
      });
    },
  },
  mounted() {
    this.GetEmployeesAPI();
  },
};
</script>

<style>
</style>