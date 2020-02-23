<template>
  <div class="hello">
    <div class="image-wrapper">
      <img :src="current_image_url" alt="Image to Decide">
    </div>
    <div>
      <div class="button" v-on:click="clickHandler('left')">
        <i class="fas fa-chevron-circle-left"></i>
        <span>귀여움</span>
      </div>
      <div class="button" v-on:click="clickHandler('right')">
        <i class="fas fa-chevron-circle-right"></i>
        <span>안 귀여움</span>
      </div>
      <p>v2.2</p>
      <div>
        <span v-show="index !== null">{{ index }}장</span>
        <label>
          <select v-model="mode">
            <option value="none" selected disabled>누르기!</option>
            <option value="cats">고양이</option>
            <option value="dogs">강아지</option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      current_image: null,
      db: null,
      collectionRef: null,
      index: null,
      total_length: 0,
      mode: null
    }
  },
  methods: {
    clickHandler(msg) {
      let cutenessRef = this.db.collection(this.mode).doc(`${this.current_image}`);
      let data = {
        updatedAt: new Date().toLocaleString()
      };

      if (msg === "left") {
        data.cuteness = true;
      } else if (msg === "right") {
        data.cuteness = false;
      }

      cutenessRef.set(data).then(() => {
        return true;
      }).catch((error) => {
        alert(`[${ error.code }] ${ error.message }`);
        return false;
      });

      if (++this.index >= this.total_length) {
        // 모두 끝
        alert("끝!");
        return false;
      }

      let saveRef = this.db.collection("save-point").doc(this.mode);
      saveRef.set({id: this.index}).then(() => {
        return true;
      });

      this.current_image = this.collectionRef.docs[this.index].id;
    },
    init() {
        this.db = this.$firebase.firestore();

        let ref = this.db.collection(this.mode);
        ref.get().then((collection) => {
          this.collectionRef = collection;
          this.total_length = collection.docs.length;

          let saveRef = this.db.collection("save-point").doc(this.mode);
          saveRef.get().then((doc) => {
            let data = doc.data();
            let id = data.id === null ?  0 : data.id;

            this.current_image = this.collectionRef.docs[id].id;
            this.index = id;
          });
        });
    }
  },
  computed:{
    current_image_url() {
      if (this.current_image !== null) {
        return `https://storage.googleapis.com/cute-cats-and-dogs/classify/${this.mode}/${this.current_image}`
      } else {
        return null;
      }
    }
  },
  watch:{
    mode: {
      handler: function () {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('keyup', event => {
        if (event.key === "ArrowLeft") {
          this.clickHandler("left");
          event.preventDefault();
        } else if (event.key === "ArrowRight") {
          this.clickHandler("right");
          event.preventDefault();
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  width: 95vw;
  height: 90vh;

  img {
    max-width: 100%;
  }

  .button {
    width: 100%;
    height: 100%;
    display: inline;
  }

  select {
    border: 1px solid black;
  }

  span {
    margin-right: 2vw;
  }
}

.image-wrapper {
  min-height: 60vh;
}

svg {
  font-size: 10vh;
  padding: 4px;
}
</style>
