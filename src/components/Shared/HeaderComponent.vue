<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div>
 <v-app-bar
      color="blue"
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="Drawer = !Drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Employees Managment</v-toolbar-title>

      <v-spacer></v-spacer>

      

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

     
    </v-app-bar>
    <v-navigation-drawer v-model="Drawer" fixed temporary >
    <v-list nav dense>
        <v-list-item to='/companies'>
            <v-list-item-icon>
              <v-icon>mdi-office-building-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Companies Managment</v-list-item-title>
          </v-list-item>
          <v-list-item to='/employees'>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Employees Managment</v-list-item-title>
          </v-list-item>
    </v-list>
    </v-navigation-drawer>
    </div>
</template>
<script>
export default
{
    name:'HeaderComponent',
    data() {
    return {
      Drawer: false,
    }
    }
}
</script>