import { ref } from "vue";
import api from "../plugins/axios";

export function useTalentType() {
  const talentTypes = ref(null);

  const loading = ref(false);

  const getTalentTypes = async () => {
    try {
      const response = await api.get('/admin/v3/talent-types');
      console.log(response.data);

      talentTypes.value = response.data;
    } catch (error) {
      console.error("Failed to fetch talent types:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  const createTalentType = async (payload) => {
    loading.value = true;
    try {
      const response = await api.post('/admin/v3/talent-types', payload);
      // refresh list
      await getTalentTypes();
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const updateTalentType = async (id, payload) => {
    loading.value = true;
    try {
      const response = await api.patch(`/admin/v3/talent-types/${id}`, payload);
      await getTalentTypes();
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const deleteTalentType = async (id) => {
    loading.value = true;
    try {
      const response = await api.delete(`/admin/v3/talent-types/${id}`);
      await getTalentTypes();
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  return {
    talentTypes,
    getTalentTypes
    , loading, createTalentType, updateTalentType, deleteTalentType
  };
}
