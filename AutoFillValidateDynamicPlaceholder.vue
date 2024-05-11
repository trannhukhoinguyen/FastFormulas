<template>
      <div class="create-post-page">
        <a-form
          ref="formRef"
          :model="formState"
          name="auto"
          layout="vertical"
          :labelCol="{ style: { fontWeight: 600 } }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >         
          <a-card :style="{ marginBottom: '24px' }" title="SEO">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item label="SEO Title" name="seoTitle">
                  <a-input
                    v-model:value="formState.seoTitle"
                    show-count
                    :maxlength="70"
                    :disabled="loading"
                    :placeholder="placeHolderSeoTitle"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-item
                    label="Slug"
                    name="slug"
                    :rules="[{
                        pattern: /^[a-zA-Z0-9\/\-]+$/,
                        message: 'Slug không hợp lệ. Vui lòng chỉ điền chữ, số, / và -'
                    }]"
                    :validateTrigger="['blur', 'change']"
                  >
                    <a-input
                      v-model:value="formState.slug"
                      show-count
                      :maxlength="1000"
                      :disabled="loading"
                      :placeholder="placeHolderSlug"
                    />
                </a-form-item>               
              </a-col>
            </a-row>
          </a-card>
        </a-form>
      </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const placeHolderSeoTitle = ref('');
const placeHolderSlug = computed(() => {
    return placeHolderSeoTitle.value?.toLowerCase().trim().split(/[\s,\t,\n]+/).join('-')
});

onMounted(() => {
  // Autofill Seo Title and Slug when press Right Arrow (keyCode: 39)
  const inputSlug = document.getElementById('auto_slug');
  const inputSeoTitle = document.getElementById('auto_seoTitle');
  inputSlug?.addEventListener('keydown', function(event) {
      if (event.keyCode === 39) {
          formState.slug = placeHolderSlug.value;
      }
  });
  inputSeoTitle?.addEventListener('keydown', function(event) {
      if (event.keyCode === 39) {
          formState.seoTitle = placeHolderSeoTitle.value;
      }
  });
})

const formRef = ref();
const formState = reactive({
  titleEn: '',
  seoTitle: '',
  slug: '', 
});

const changeTitle = (e) => {
  placeHolderSeoTitle.value = e.target.value;
};
</script>
