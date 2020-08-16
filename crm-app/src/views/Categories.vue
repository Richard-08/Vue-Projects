<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import Loader from "../components/app/Loader";

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    };
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  name: "categories",
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },
  methods: {
    addNewCategory(cat) {
      this.categories.push(cat);
    },
    updateCategories(cat) {
      const idx = this.categories.findIndex(c => c.id === cat.id);
      this.categories[idx].title = cat.title;
      this.categories[idx].limit = cat.limit;
      this.updateCount += 1;
    }
  }
};
</script>
