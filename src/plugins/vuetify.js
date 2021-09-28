import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.purple.darken1, 
            secondary: colors.purple.lighten4, 
            accent: colors.purple.accent2, 
            base: colors.purple.lighten5, // #F3E5F5
            title: colors.brown.lighten1,
            land: colors.pink.lighten5,
            sea: colors.blue.lighten5            
          },
        },
      },
});
