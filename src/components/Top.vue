<template>
<v-container fluid style="overflow-x: hidden; margin-top: 100px; margin-bottom: 100px;">
  <v-card flat class="mx-auto homefone" width="100%" max-width="1440">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card-text class="text-center text-md-left">
          <h1 class="text-center text-md-left">{{ top.header }}</h1>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="text-center mx-auto">
        <v-card flat width="100%" max-width="500" class="transparent mx-auto">
          <v-card-text class="mx-auto mx-lg-0">
            <p class="text-center text-md-left">
              {{ top.text }}
            </p>
          </v-card-text>
          <v-card-text class="text-center text-md-left">
            <v-btn
                color="buttons"
                dark
                height="48"
                min-width="180"
                class="submit-button px-auto mx-auto"
                @click="$emit('update:page', top.goto)"
            >
                {{ top.button }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
          <v-card flat width="100%" max-width="600" class="transparent">
            <v-img :src="require('@/assets/pictures/lady_on_sofa.svg')" max-width="750" class="mx-auto"></v-img>
          </v-card>
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<style scoped>
.top-element {
  margin-top: 120px;
  margin-bottom: 64px;
}
p {
  line-height: 180%!important;
}
@media screen and (max-width: 500px) {
  .top-element {
    margin-top: 80px;
    margin-bottom: 48px;
  }
}
</style>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Top',
  props: ['page'],
  computed: {
    ...mapState('content', ['top']),
    ...mapGetters(['familyPicture'])
  }
}
</script>
