<script setup>
import { onMounted, reactive, ref } from "vue";

import { getErrorMessage } from "@/api/http";
import { uploadImageToImgbb } from "@/api/imageHost";
import {
  deleteItem,
  editItem,
  getItemDetail,
  getMyItems,
  publishItem,
} from "@/api/item";
import ItemCard from "@/components/ItemCard.vue";

const items = ref([]);
const loading = ref(false);
const actionLoading = ref(false);
const imageUploading = ref(false);
const pageError = ref("");
const successMessage = ref("");
const editError = ref("");
const editingId = ref(null);
const uploadStatus = ref("");

const publishForm = reactive({
  title: "",
  price: "",
  imageUrlsText: "",
  description: "",
});

const editForm = reactive({
  id: "",
  title: "",
  description: "",
  price: "",
  stock: 1,
});

function resetPublishForm() {
  publishForm.title = "";
  publishForm.price = "";
  publishForm.imageUrlsText = "";
  publishForm.description = "";
}

function resetEditForm() {
  editingId.value = null;
  editForm.id = "";
  editForm.title = "";
  editForm.description = "";
  editForm.price = "";
  editForm.stock = 1;
  editError.value = "";
}

function parseImageUrls(text) {
  if (!text || !text.trim()) {
    return [];
  }
  return Array.from(
    new Set(
      text
        .split(/\r?\n|,/) 
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  );
}

async function handleUploadImages(event) {
  const input = event.target;
  const files = Array.from(input?.files || []);
  if (!files.length) {
    return;
  }

  pageError.value = "";
  successMessage.value = "";
  uploadStatus.value = "";

  imageUploading.value = true;
  try {
    const uploadedUrls = [];
    for (let i = 0; i < files.length; i += 1) {
      uploadStatus.value = `正在上传 ${i + 1}/${files.length} 张图片...`;
      const url = await uploadImageToImgbb(files[i]);
      uploadedUrls.push(url);
    }

    const currentUrls = parseImageUrls(publishForm.imageUrlsText);
    publishForm.imageUrlsText = [...currentUrls, ...uploadedUrls].join("\n");
    successMessage.value = `上传成功，已追加 ${uploadedUrls.length} 张图片`;
  } catch (error) {
    pageError.value = getErrorMessage(error, "图片上传失败");
  } finally {
    imageUploading.value = false;
    uploadStatus.value = "";
    if (input) {
      input.value = "";
    }
  }
}

async function loadItems() {
  loading.value = true;
  pageError.value = "";

  try {
    items.value = await getMyItems();
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载我的商品失败");
  } finally {
    loading.value = false;
  }
}

async function handlePublish() {
  actionLoading.value = true;
  successMessage.value = "";
  pageError.value = "";

  try {
    const imageUrls = parseImageUrls(publishForm.imageUrlsText);
    if (!imageUrls.length) {
      throw new Error("请至少填写一个图片地址");
    }

    await publishItem({
      title: publishForm.title,
      price: publishForm.price,
      description: publishForm.description,
      imageUrls: JSON.stringify(imageUrls),
    });

    successMessage.value = "商品提交成功，等待管理员审核";
    resetPublishForm();
    await loadItems();
  } catch (error) {
    pageError.value = getErrorMessage(error, "发布商品失败");
  } finally {
    actionLoading.value = false;
  }
}

async function startEdit(itemId) {
  actionLoading.value = true;
  successMessage.value = "";
  editError.value = "";

  try {
    const detail = await getItemDetail(itemId);
    editingId.value = itemId;
    editForm.id = detail.id;
    editForm.title = detail.title;
    editForm.description = detail.description || "";
    editForm.price = detail.price;
    editForm.stock = detail.stock;
  } catch (error) {
    editError.value = getErrorMessage(error, "加载商品编辑信息失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleUpdate() {
  actionLoading.value = true;
  successMessage.value = "";
  editError.value = "";

  try {
    await editItem({
      id: editForm.id,
      title: editForm.title,
      description: editForm.description,
      price: editForm.price,
      stock: editForm.stock,
    });
    successMessage.value = "商品更新成功";
    resetEditForm();
    await loadItems();
  } catch (error) {
    editError.value = getErrorMessage(error, "更新商品失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleDelete(itemId) {
  if (!window.confirm("确定删除这个商品吗？")) {
    return;
  }

  actionLoading.value = true;
  successMessage.value = "";
  pageError.value = "";

  try {
    await deleteItem(itemId);
    successMessage.value = "商品删除成功";
    if (editingId.value === itemId) {
      resetEditForm();
    }
    await loadItems();
  } catch (error) {
    pageError.value = getErrorMessage(error, "删除商品失败");
  } finally {
    actionLoading.value = false;
  }
}

onMounted(loadItems);
</script>

<template>
  <div class="page-grid page-grid--two-columns">
    <section class="panel">
      <div class="section-heading">
        <h1>发布商品</h1>
      </div>

      <form class="form-grid" @submit.prevent="handlePublish">
        <label class="field">
          <span class="field__label">商品标题</span>
          <input v-model="publishForm.title" class="input" type="text" placeholder="请输入商品标题" />
        </label>

        <label class="field">
          <span class="field__label">价格</span>
          <input v-model="publishForm.price" class="input" type="number" min="0.01" step="0.01" />
        </label>

        <label class="field">
          <span class="field__label">图片地址（每行一个，首行作为封面）</span>
          <textarea
            v-model="publishForm.imageUrlsText"
            class="textarea"
            rows="4"
            placeholder="https://example.com/1.jpg&#10;https://example.com/2.jpg"
          />
        </label>

        <label class="field">
          <span class="field__label">上传本地图片并自动填入地址</span>
          <input
            class="input"
            type="file"
            accept="image/*"
            multiple
            :disabled="imageUploading || actionLoading"
            @change="handleUploadImages"
          />
          <span v-if="imageUploading" class="helper-text">{{ uploadStatus }}</span>
        </label>

        <label class="field">
          <span class="field__label">商品描述</span>
          <textarea
            v-model="publishForm.description"
            class="textarea"
            rows="5"
            placeholder="请填写商品描述"
          />
        </label>

        <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
        <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

        <button class="button button--block" type="submit" :disabled="actionLoading">
          {{ actionLoading ? "提交中..." : "发布商品" }}
        </button>
      </form>
    </section>

    <div class="stack">
      <section class="panel">
        <div class="section-heading">
          <h2>我的商品</h2>
        </div>

        <div v-if="loading" class="empty-block">正在加载商品...</div>
        <div v-else-if="items.length" class="item-grid">
          <ItemCard v-for="item in items" :key="item.id" :item="item">
            <template #extra>
              <p v-if="item.reason" class="helper-text">驳回原因：{{ item.reason }}</p>
            </template>
            <template #actions>
              <button
                class="button button--ghost button--small"
                type="button"
                :disabled="actionLoading"
                @click="startEdit(item.id)"
              >
                编辑商品
              </button>
              <button
                class="button button--danger button--small"
                type="button"
                :disabled="actionLoading"
                @click="handleDelete(item.id)"
              >
                删除商品
              </button>
            </template>
          </ItemCard>
        </div>
        <div v-else class="empty-block">你还没有发布任何商品。</div>
      </section>

      <section v-if="editingId" class="panel">
        <div class="section-heading">
          <h2>编辑商品</h2>
        </div>

        <form class="form-grid" @submit.prevent="handleUpdate">
          <label class="field">
            <span class="field__label">商品标题</span>
            <input v-model="editForm.title" class="input" type="text" />
          </label>

          <label class="field">
            <span class="field__label">价格</span>
            <input v-model="editForm.price" class="input" type="number" min="0.01" step="0.01" />
          </label>

          <label class="field">
            <span class="field__label">库存</span>
            <input v-model="editForm.stock" class="input" type="number" min="1" step="1" />
          </label>

          <label class="field">
            <span class="field__label">商品描述</span>
            <textarea v-model="editForm.description" class="textarea" rows="5" />
          </label>

          <div v-if="editError" class="notice notice--error">{{ editError }}</div>

          <div class="action-row">
            <button class="button" type="submit" :disabled="actionLoading">保存修改</button>
            <button class="button button--ghost" type="button" @click="resetEditForm">取消编辑</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
