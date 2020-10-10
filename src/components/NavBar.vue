<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">S9_C3DG</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="navItem" href="/#/lr1">Л/р 1</b-nav-item>
          <b-nav-item class="navItem" href="/#/lr2">Л/р 2</b-nav-item>
          <b-nav-item class="navItem" href="/#/lr3">Л/р 3</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
.navItem {
  font-size: 20px;
  color: white;
}
</style>
