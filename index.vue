<template>
  <div>
    <a-page-header :ghost="false" @back="() => $router.go(-1)" title="Thêm mới Bài viết" :breadcrumb="breadcrumb">
      <template #extra>
        <a-button key="2" @click="() => formRef.resetFields()" :disabled="loading">Clear</a-button>
        <a-button key="1" type="primary" @click="onSubmit" :loading="loading">Submit</a-button>
      </template>
    </a-page-header>
    <div class="page-wrapper">
      <div class="create-post-page">
        <a-form
          ref="formRef"
          :model="formState"
          name="basic"
          layout="vertical"
          :labelCol="{ style: { fontWeight: 600 } }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-card :style="{ marginBottom: '24px' }" title="TỔNG QUAN">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item
                  label="Danh mục"
                  name="postGroupId"
                  :rules="[{ required: true, message: 'Vui lòng chọn danh mục' }]"
                >
                    <a-tree-select
                            v-model:value="formState.postGroupId"
                            show-search
                            :disabled="loading"
                            :loading="loadingRelatives"
                            style="width: 100%"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            placeholder="Chọn danh mục"
                            allow-clear
                            tree-default-expand-all
                            :tree-data="postGroupData"
                    />
                </a-form-item>
                <a-form-item label="Địa điểm" name="locationIds">
                  <a-select
                      v-model:value="formState.locationIds"
                      placeholder="Please select"
                      :disabled="loading"
                      :loading="loadingRelatives"
                      :options="
                      resultRelatives?.locations?.data?.map((location) => ({
                        value: location.key,
                        label: location.titleEn,
                      }))
                    "
                      mode="multiple"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item
                  label="Trạng thái"
                  name="status"
                  :rules="[{ required: true, message: 'Vui lòng chọn trạng thái' }]"
                >
                  <a-select v-model:value="formState.status" placeholder="Chọn tình trạng" :disabled="loading">
                    <a-select-option value="ENABLED">Kích hoạt</a-select-option>
                    <a-select-option value="DISABLED">Đã khóa</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="Thứ tự hiển thị" name="sort">
                  <a-input-number v-model:value="formState.sort" min="0" max="65535" :disabled="loading" />
                </a-form-item>
              </a-col>
              <template
                v-if="
                  prefix == 'include' &&
                  (postGroupIds.split(',').includes('34') ||
                    postGroupIds.split(',').includes('35') ||
                    postGroupIds.split(',').includes('36'))
                "
              >
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-item name="startedAt" label="Thời gian bắt đầu">
                    <a-date-picker
                      v-model:value="formState.startedAt"
                      format="YYYY-MM-DD"
                      placeholder="Thời gian bắt đầu"
                      style="width: 100%"
                    >
                    </a-date-picker>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-item name="finishedAt" label="Thời gian kết thúc">
                    <a-date-picker
                      v-model:value="formState.finishedAt"
                      format="YYYY-MM-DD"
                      placeholder="Thời gian kết thúc"
                      style="width: 100%"
                    >
                    </a-date-picker>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item label="Hình ảnh (1080 x 720)" name="images">
                  <g-upload
                      mode="multiple"
                      v-model:files="fileListImages"
                      type="POST_AVATAR"
                      :serviceId="serviceId"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item label="Hình bìa (1920 x 400)" name="coverImage">
                  <g-upload
                      v-model:files="fileListCovers"
                      type="POST_COVER"
                      :serviceId="serviceId"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card :style="{ marginBottom: '24px' }" title="THÔNG TIN MÔ TẢ">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item
                  label="Tiêu đề (EN)"
                  name="titleEn"
                  :rules="[{ required: true, message: 'Vui lòng nhập tiêu đề (EN)' }]"
                >
                  <a-input v-model:value="formState.titleEn" @change="changeTitle" :disabled="loading" />
                </a-form-item>
                <a-form-item label="Mô tả (EN)" name="descriptionEn">
                  <a-textarea
                    v-model:value="formState.descriptionEn"
                    :disabled="loading"
                    :autoSize="{ minRows: 4, maxRows: 6 }"
                  />
                </a-form-item>
                <a-form-item
                  label="Nội dung (EN)"
                  name="contentEn"
                  :rules="[{ required: true, message: 'Vui lòng nhập nội dung (EN)' }]"
                >
                  <template v-if="service.type == 'EVISA' || service.type == 'ALL'">
                    <GCkeditor
                        v-model:value="formState.contentEn"
                        :serviceId="serviceId"
                    />
                  </template>
                  <template v-else>
                    <QuillEditor
                      ref="quillContentEn"
                      theme="snow"
                      contentType="html"
                      toolbar="full"
                      :modules="modules"
                      v-model:content="formState.contentEn"
                      style="height: 700px"
                    />
                  </template>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item
                  label="Tiêu đề (VI)"
                  name="titleVi"
                  :rules="[{ required: true, message: 'Vui lòng nhập tiêu đề (VI)' }]"
                >
                  <a-input v-model:value="formState.titleVi" :disabled="loading" />
                </a-form-item>
                <a-form-item label="Mô tả (VI)" name="descriptionVi">
                  <a-textarea
                    v-model:value="formState.descriptionVi"
                    :disabled="loading"
                    :autoSize="{ minRows: 4, maxRows: 6 }"
                  />
                </a-form-item>
                <a-form-item
                  label="Nội dung (VI)"
                  name="contentVi"
                  :rules="[{ required: true, message: 'Vui lòng nhập nội dung (VI)' }]"
                >
                  <template v-if="service.type == 'EVISA' || service.type == 'ALL'">
                    <GCkeditor
                        v-model:value="formState.contentVi"
                        :serviceId="serviceId"
                    />
                  </template>
                  <template v-else>
                    <QuillEditor
                      ref="quillContentVi"
                      theme="snow"
                      contentType="html"
                      toolbar="full"
                      :modules="modules"
                      v-model:content="formState.contentVi"
                      style="height: 700px"
                    />
                  </template>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
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
                <a-form-item label="SEO Description" name="seoDescription">
                  <a-textarea
                    v-model:value="formState.seoDescription"
                    :disabled="loading"
                    :autoSize="{ minRows: 4, maxRows: 6 }"
                    show-count
                    :maxlength="300"
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
                <a-form-item label="SEO Keywords" name="seoKeywords">
                  <a-textarea
                    v-model:value="formState.seoKeywords"
                    :disabled="loading"
                    :autoSize="{ minRows: 4, maxRows: 6 }"
                    show-count
                    :maxlength="1000"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import ImageUploader from 'quill-image-uploader';
import GUpload from '~/components/glodival/GUpload.vue';
import dayjs from 'dayjs';
import GCkeditor from "~/components/glodival/GCkeditor.vue";
import {useGlobal} from "~/stores/global";

const router = useRouter();
const route = useRoute();
const serviceId = route.params.serviceid;
const pathPrefix = `/crm/service-${serviceId}`;
const prefix = route.params.prefix;
const postGroupIds = route.params.postgroupids;
const placeHolderSeoTitle = ref('');
const placeHolderSlug = computed(() => {
    return placeHolderSeoTitle.value?.toLowerCase().trim().split(/[\s,\t,\n]+/).join('-')
});

const global = useGlobal();
const service = global.findService(serviceId);

const breadcrumb = {
  routes: [
    {
      path: `${pathPrefix}/post/${postGroupIds ? prefix + '-' + postGroupIds + '/' : ''}`,
      breadcrumbName: 'Bài viết',
    },
    {
      path: `${pathPrefix}/post/${postGroupIds ? prefix + '-' + postGroupIds + '/' : ''}/create`,
      breadcrumbName: 'Thêm mới',
    },
  ],
};

const routeLeaveWithoutConfirm = ref(false);
onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Autofill Seo Title and Slug when press Right Arrow (keyCode: 39)
  const inputSlug = document.getElementById('basic_slug');
  const inputSeoTitle = document.getElementById('basic_seoTitle');
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
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
})
onBeforeRouteLeave(() => {
  if(routeLeaveWithoutConfirm.value == false){
    const answer = window.confirm('Do you really want to leave?')
    if (!answer) return false
  }
})
const handleBeforeUnload = (event) => {
  // show a confirmation dialog to the user
  event.preventDefault();
  event.returnValue = '';
};

let whereLocationsDefault = [
  {
    column: 'SERVICE_ID',
    operator: 'EQ',
    value: serviceId,
  },
];
let whereDefault = [
  {
    column: 'SERVICE_ID',
    operator: 'EQ',
    value: serviceId,
  },
  {
    column: 'PARENT_ID',
    operator: 'IS_NULL',
  },
];
let operator = '';
if (prefix == 'exclude') {
  operator = 'NOT_IN';
} else if (prefix == 'include') {
  operator = 'IN';
}
whereDefault.push({
  column: 'ID',
  operator: operator,
  value: postGroupIds.length ? postGroupIds.split(',') : [],
});

const queryRelatives = gql`
  query relatives(
    $where: QueryPostGroupsWhereWhereConditions
    $whereLocations: QueryLocationsWhereWhereConditions
  ) {
    postGroups(page: 1, first: 100000, where: $where) {
      paginatorInfo {
        currentPage
        perPage
        total
      }
      data {
        key: id
        titleEn
        titleVi
        postGroupAsChildren{
          data{
            id
            titleEn
            titleVi
            postGroupAsChildren{
              data{
                id
                titleEn
                titleVi
              }
            }
          }
        }
      }
    }
    locations(first: 1000, where: $whereLocations) {
      data {
        key: id
        titleEn
        titleVi
      }
    }
  }
`;
const { result: resultRelatives, loading: loadingRelatives } = useQuery(
  queryRelatives,
  {
    where: {
      AND: whereDefault,
    },
    whereLocations: {
      AND: whereLocationsDefault,
    },
  },
  {
    fetchPolicy: 'no-cache',
  },
);

// TreeSelect - postGroups
let postGroupData = ref([]);
watch (resultRelatives, () => {
    if(resultRelatives) {
        const groupData = resultRelatives?.value?.postGroups?.data;
        let postGroupDataTemp = [];
        postGroupDataTemp = groupData.map(group => {
            return ({
                title: group.titleEn,
                value: group.key,
                children: group.postGroupAsChildren?.data.map(child => {
                    return ({
                        title: child.titleEn,
                        value: child.id,
                        children: child.postGroupAsChildren?.data.map(childNext => {
                            return ({
                                title: childNext.titleEn,
                                value: childNext.id,
                            })
                        })
                    })
                })
            })
        })
        postGroupData.value = postGroupDataTemp;
    }
});

const queryCreate = gql`
  mutation postCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      id
    }
  }
`;
const { mutate, loading } = useMutation(queryCreate, {
  fetchPolicy: 'no-cache',
});

const queryUploadFileImage = gql`
  mutation fileImageUpload($input: FileImageUploadInput!) {
    fileImageUpload(input: $input) {
      url
    }
  }
`;
const { mutate: mutateUploadFileImage, loading: loadingUploadFileImage } = useMutation(queryUploadFileImage, {
  fetchPolicy: 'no-cache',
});

const formRef = ref();
const quillContentEn = ref(null);
const quillContentVi = ref(null);
const formState = reactive({
  titleEn: '',
  titleVi: '',
  descriptionEn: '',
  descriptionVi: '',
  contentEn: '',
  contentVi: '',
  seoTitle: '',
  slug: '',
  seoDescription: '',
  seoKeywords: '',
  startedAt: '',
  finishedAt: '',
  sort: 0,
  status: 'ENABLED',
  postGroupId: '',
  images: [],
  coverImage: [],
  locationIds: [],
});

const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        console.log(file);
        mutateUploadFileImage({
          input: {
            serviceId: serviceId,
            image: file,
          },
        })
          .then(({ data }) => {
            message.success('Đã upload thành công.');
            console.log('sssssss', data?.fileImageUpload?.url);

            let url = data?.fileImageUpload?.url;
            if (url != '') {
              resolve(url);
            } else {
              message.error('Upload thất bại.');
              reject('Upload failed');
            }
          })
          .catch((err) => {
            console.error('Error:', err);
            message.error('Upload thất bại.');
            reject('Upload failed');
          });
      });
    },
  },
};

const fileListImages = ref([]);
const fileListCovers = ref([]);

const changeTitle = (e) => {
  placeHolderSeoTitle.value = e.target.value;
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then((formState) => {
      formState.startedAt = formState.startedAt ? formState.startedAt.format('YYYY-MM-DD') : '';
      formState.finishedAt = formState.finishedAt ? formState.finishedAt.format('YYYY-MM-DD') : '';
      console.log('values', formState);
      onFinish(formState);
    })
    .catch((error) => {
      onFinishFailed(error);
      console.log('error', error);
    });
};

const onFinish = (values) => {
  let input = { ...values };

  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      //Now, input[key] is the current value
      if (input[key] === null || input[key] === '') {
        delete input[key];
      }
    }
  }

  let images = fileListImages.value.map((file) => {
    console.log('images xxxxxxxxxx:', file.url);
    return file.url;
  });
  input.images = images;

  input.locations = {
    sync: input.locationIds,
  };
  delete input.locationIds;

  if (fileListCovers.value && fileListCovers.value.length) {
    input.coverImage = fileListCovers.value[0].url;
  } else {
    input.coverImage = '';
  }
  input.serviceId = serviceId;

  if (formState.slug === '') {
      input.slug = null;
  }

  console.log('Success:', input);

  mutate({
    input: input,
  }).then(() => {
    message.success('Đã tạo thành công.');
    formRef.value.resetFields();
    routeLeaveWithoutConfirm.value = true;
    router.push(`${pathPrefix}/post/${postGroupIds ? prefix + '/' + postGroupIds + '/' : ''}`);
  }).catch((error) => {
      console.log('error', error);
      const errorMessage = Array.from(
          new Set(
              Object.values(error.graphQLErrors[0].extensions.validation)
                  .map(value => value.join())
          )
      ).join();
      message.error(`Đã xảy ra lỗi ${errorMessage}! Vui lòng nhập Slug khác!`, 5);
  });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>

<style lang="scss">
.create-post-page {
  .ant-transfer {
    @media (max-width: 768px) {
      display: block;
    }
  }
}
</style>
