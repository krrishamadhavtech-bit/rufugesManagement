import { API } from "./auth";
import { CATEGORY_ENDPOINTS, SUB_CATEGORY_ENDPOINTS } from "./ApiEndpoints";

export const fetchCategories = async () => {
    try {
        const response = await API.get(CATEGORY_ENDPOINTS.LIST);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchSubCategories = async (categoryId) => {
    try {
        const response = await API.get(SUB_CATEGORY_ENDPOINTS.LIST_BY_CATEGORY(categoryId));
        return response.data;
    } catch (error) {
        console.error("Error fetching sub-categories:", error);
        throw error;
    }
};
export const addCategory = async (categoryData) => {
    try {
        const formData = new FormData();

        // Append names
        formData.append("name[en]", categoryData.name_en);
        formData.append("name[hi]", categoryData.name_hi);
        formData.append("name[gu]", categoryData.name_gu);

        // Append descriptions
        formData.append("description[en]", categoryData.desc_en);
        formData.append("description[hi]", categoryData.desc_hi);
        formData.append("description[gu]", categoryData.desc_gu);

        // Append icon if it's a file
        if (categoryData.iconFile) {
            formData.append("icon", categoryData.iconFile);
            console.log("Icon attached:", categoryData.iconFile.name);
        }

        // Log FormData contents for debugging
        console.log('Sending Category Data:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await API.post("/category/add-category", formData);
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error.response?.data || error.message);
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const formData = new FormData();

        if (categoryData.name_en) formData.append("name[en]", categoryData.name_en);
        if (categoryData.name_hi) formData.append("name[hi]", categoryData.name_hi);
        if (categoryData.name_gu) formData.append("name[gu]", categoryData.name_gu);

        if (categoryData.desc_en) formData.append("description[en]", categoryData.desc_en);
        if (categoryData.desc_hi) formData.append("description[hi]", categoryData.desc_hi);
        if (categoryData.desc_gu) formData.append("description[gu]", categoryData.desc_gu);

        if (categoryData.iconFile) {
            formData.append("icon", categoryData.iconFile);
        }

        // Log update data
        console.log('Updating Category Data [Full Log]:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await API.put(`/category/update-category/${categoryId}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error.response?.data || error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await API.delete(`/category/delete-category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error.response?.data || error);
        throw error;
    }
};

export const addSubCategory = async (subCategoryData) => {
    try {
        const formData = new FormData();

        formData.append("name[en]", subCategoryData.name_en);
        formData.append("name[hi]", subCategoryData.name_hi);
        formData.append("name[gu]", subCategoryData.name_gu);

        formData.append("content[en]", subCategoryData.content_en);
        formData.append("content[hi]", subCategoryData.content_hi);
        formData.append("content[gu]", subCategoryData.content_gu);

        formData.append("categoryId", subCategoryData.categoryId);

        const response = await API.post(SUB_CATEGORY_ENDPOINTS.ADD, formData);
        return response.data;
    } catch (error) {
        console.error("Error adding sub-category:", error.response?.data || error.message);
        throw error;
    }
};

export const updateSubCategory = async (subCategoryId, subCategoryData) => {
    try {
        const formData = new FormData();

        if (subCategoryData.name_en) formData.append("name[en]", subCategoryData.name_en);
        if (subCategoryData.name_hi) formData.append("name[hi]", subCategoryData.name_hi);
        if (subCategoryData.name_gu) formData.append("name[gu]", subCategoryData.name_gu);

        if (subCategoryData.content_en) formData.append("content[en]", subCategoryData.content_en);
        if (subCategoryData.content_hi) formData.append("content[hi]", subCategoryData.content_hi);
        if (subCategoryData.content_gu) formData.append("content[gu]", subCategoryData.content_gu);

        if (subCategoryData.categoryId) formData.append("categoryId", subCategoryData.categoryId);

        const response = await API.put(SUB_CATEGORY_ENDPOINTS.UPDATE(subCategoryId), formData);
        return response.data;
    } catch (error) {
        console.error("Error updating sub-category:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteSubCategory = async (subCategoryId) => {
    try {
        const response = await API.delete(SUB_CATEGORY_ENDPOINTS.DELETE(subCategoryId));
        return response.data;
    } catch (error) {
        console.error("Error deleting sub-category:", error.response?.data || error.message);
        throw error;
    }
};
