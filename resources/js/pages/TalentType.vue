<script setup>
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { useTalentType } from '../composables/useTalentType';

const { talentTypes, getTalentTypes, createTalentType, updateTalentType, deleteTalentType, loading } = useTalentType();

const modalEl = ref(null);
let bsModal = null;

const form = ref({ id: null, name: '', description: '' });
const isEditing = ref(false);

const openAdd = () => {
  isEditing.value = false;
  form.value = { id: null, name: '', description: '' };
  bsModal.show();
};

const openEdit = (type) => {
  isEditing.value = true;
  form.value = { id: type.id, name: type.name, description: type.description };
  bsModal.show();
};

const submit = async () => {
  const payload = { name: form.value.name, description: form.value.description };
  if (isEditing.value) {
    await updateTalentType(form.value.id, payload);
  } else {
    await createTalentType(payload);
  }
  bsModal.hide();
};

const remove = async (id) => {
  if (!confirm('Delete this talent type?')) return;
  await deleteTalentType(id);
};

onMounted(() => {
  getTalentTypes();
  // init bootstrap modal
  if (modalEl.value) {
    bsModal = new Modal(modalEl.value);
  }
});
</script>

<template>
  <div>
    <h1>Talent Types</h1>
    <div class="mb-3">
      <button class="btn btn-success" @click="openAdd">Add Talent Type</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Talent Count</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in talentTypes?.result ?? []" :key="type.id">
            <th scope="row">{{ type.id }}</th>
            <td>{{ type.name }}</td>
            <td>{{ type.talent_count }}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1" @click="openEdit(type)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="remove(type.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="!(talentTypes?.result && talentTypes.result.length)">
            <td colspan="4" class="text-center">No talent types available.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div class="modal fade" tabindex="-1" ref="modalEl" id="talentTypeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit' : 'Add' }} Talent Type</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" v-model="form.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" v-model="form.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" :disabled="loading" @click="submit">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>