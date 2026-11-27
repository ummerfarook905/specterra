import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
  uploadServiceImage,
} from "../../api/servicesApi";

// API base URL should normally be: http://localhost:5000/api
// Uploaded images are served by Express from: http://localhost:5000/uploads/...
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_ORIGIN = API_BASE_URL
  .replace(/\/api(?:\/v\d+)?\/?$/i, "")
  .replace(/\/+$/, "");

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") return "";

  const value = image.trim().replace(/\\/g, "/");
  if (!value) return "";

  // Keep absolute URLs and browser-created preview URLs unchanged.
  if (/^(https?:)?\/\//i.test(value) || /^(data|blob):/i.test(value)) {
    return value;
  }

  // The upload controller returns /uploads/<filename>.
  // Also normalize older values such as uploads/<filename> or
  // /api/uploads/<filename> to the Express static URL /uploads/<filename>.
  let imagePath = value
    .replace(/^\/?api\/uploads\//i, "/uploads/")
    .replace(/^uploads\//i, "/uploads/");

  // If the database contains only a filename, it lives in /uploads.
  if (!imagePath.startsWith("/")) {
    imagePath = `/uploads/${imagePath}`;
  }

  return `${API_ORIGIN}${imagePath}`;
};

const emptyForm = {
  category: "",
  title: "",
  image: "",
  description: "",
  features: [""],
  isActive: true,
  sortOrder: 0,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  // -----------------------------------------
  // Fetch services
  // -----------------------------------------

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getServices();

      const data = Array.isArray(response)
        ? response
        : response?.data || [];

      setServices(data);
    } catch (err) {
      console.error("Fetch services error:", err);

      setError(
        err?.response?.data?.message || "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // -----------------------------------------
  // Helpers
  // -----------------------------------------

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const clearPreviewUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
  };

  const resetForm = () => {
    clearPreviewUrl();

    setFormData(emptyForm);
    setImagePreview("");
    setImageError("");
    setEditingService(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    if (saving || uploadingImage) return;

    setIsModalOpen(false);
    resetForm();
  };

  const openAddModal = () => {
    clearMessages();
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    clearMessages();
    resetForm();

    setEditingService(service);

    setFormData({
      category: service.category || "",
      title: service.title || "",
      image: service.image || "",
      description: service.description || "",
      features:
        Array.isArray(service.features) && service.features.length
          ? service.features
          : [""],
      isActive: service.isActive ?? true,
      sortOrder: service.sortOrder ?? 0,
    });

    setImagePreview(getImageUrl(service.image));
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------------------
  // Features
  // -----------------------------------------

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;

      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // -----------------------------------------
  // Image upload
  // -----------------------------------------

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    clearMessages();
    setImageError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    clearPreviewUrl();

    const preview = URL.createObjectURL(file);
    previewUrlRef.current = preview;

    setImagePreview(preview);
    setUploadingImage(true);

    try {
      // Upload image to backend
      const uploadedImage = await uploadServiceImage(file);

      if (!uploadedImage) {
        throw new Error("Image upload did not return an image path.");
      }

      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
    } catch (err) {
      console.error("Image upload error:", err);

      setImageError(
        err?.response?.data?.message ||
          err?.message ||
          "Image upload failed. Please try again."
      );

      setFormData((prev) => ({
        ...prev,
        image: editingService?.image || "",
      }));

      setImagePreview(
        editingService?.image
          ? getImageUrl(editingService.image)
          : ""
      );

      clearPreviewUrl();
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploadingImage) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (uploadingImage) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    handleImageChange({
      target: {
        files: [file],
        value: "",
      },
    });
  };

  const removeImage = () => {
    clearPreviewUrl();

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    setImagePreview("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------------------
  // Create / Update service
  // -----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearMessages();

    if (!formData.category.trim()) {
      setError("Please enter a service category.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a service title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a service description.");
      return;
    }

    if (uploadingImage) {
      setError("Please wait until the image upload finishes.");
      return;
    }

    const cleanedFeatures = formData.features
      .map((feature) => feature.trim())
      .filter(Boolean);

    const payload = {
      category: formData.category.trim(),
      title: formData.title.trim(),
      image: formData.image,
      description: formData.description.trim(),
      features: cleanedFeatures,
    };

    try {
      setSaving(true);

      if (editingService) {
        await updateService(editingService.id, {
          ...payload,
          isActive: formData.isActive,
          sortOrder: Number(formData.sortOrder) || 0,
        });

        setSuccess("Service updated successfully.");
      } else {
        await createService(payload);

        setSuccess("Service created successfully.");
      }

      setIsModalOpen(false);
      resetForm();

      await fetchServices();
    } catch (err) {
      console.error("Save service error:", err);

      setError(
        err?.response?.data?.message || "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------
  // Delete service
  // -----------------------------------------

  const handleDelete = async (service) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) return;

    clearMessages();

    try {
      await deleteService(service.id);

      setSuccess("Service deleted successfully.");

      await fetchServices();
    } catch (err) {
      console.error("Delete service error:", err);

      setError(
        err?.response?.data?.message || "Failed to delete service."
      );
    }
  };

  // -----------------------------------------
  // Toggle active status
  // -----------------------------------------

  const handleToggleStatus = async (service) => {
    clearMessages();

    try {
      await updateService(service.id, {
        isActive: !service.isActive,
      });

      setSuccess("Service status updated successfully.");

      await fetchServices();
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to update service status."
      );
    }
  };

  // -----------------------------------------
  // Filter services
  // -----------------------------------------

  const filteredServices = services.filter((service) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      service.title?.toLowerCase().includes(search) ||
      service.category?.toLowerCase().includes(search) ||
      service.description?.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && service.isActive !== false) ||
      (filterStatus === "inactive" && service.isActive === false);

    return matchesSearch && matchesStatus;
  });

  const activeCount = services.filter(
    (service) => service.isActive !== false
  ).length;

  const inactiveCount = services.length - activeCount;

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-[#f4f7f5] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#7a9487]">
            Content Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#104735] sm:text-4xl">
            Services
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your website services, images and content.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#104735] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#104735]/10 transition hover:bg-[#0b3829]"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* Notifications */}
      {error && !isModalOpen && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
          <button
            onClick={() => setError("")}
            className="ml-auto"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {success}
          <button
            onClick={() => setSuccess("")}
            className="ml-auto"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#104735]">
            {services.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Active Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Inactive Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-500">
            {inactiveCount}
          </h2>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-[#e4ece7] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#104735]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#104735]"
          >
            <option value="all">All Services</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={fetchServices}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Services list - reference card design */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="animate-spin text-[#104735]" size={35} />
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
          <ImageIcon className="mx-auto mb-4 text-gray-300" size={45} />
          <h3 className="font-serif text-xl font-bold text-[#073d32]">
            No Services Found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Add a service or change your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e5ebe7] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image and labels */}
              <div className="relative h-[240px] shrink-0 overflow-hidden bg-[#e8efea]">
                {service.image ? (
                  <img
                    src={getImageUrl(service.image)}
                    alt={service.title || "Service"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#9aafa2]">
                    <ImageIcon size={46} />
                  </div>
                )}

                <div className="absolute left-3 top-2 z-10">
                  <span className="inline-block bg-[#063c30] px-3 py-2 font-serif text-xs font-bold uppercase tracking-wide text-white">
                    {service.category || "SERVICE"}
                  </span>
                </div>

                <div className="absolute right-3 top-2 z-10">
                  <span
                    className={`inline-block rounded-md px-3 py-2 text-xs font-semibold text-white ${
                      service.isActive === false
                        ? "bg-[#4b5563]"
                        : "bg-[#548d13]"
                    }`}
                  >
                    {service.isActive === false ? "Inactive" : "Active"}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col px-6 pb-5 pt-5">
                <h2 className="font-serif text-xl font-bold leading-snug text-[#073d32]">
                  {service.title}
                </h2>

                <p className="mt-2 text-sm leading-[1.65] text-[#46534f]">
                  {service.description}
                </p>

                {Array.isArray(service.features) &&
                  service.features.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {service.features.map((feature, index) => (
                        <div
                          key={`${service.id}-feature-${index}`}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-[#548d13]"
                          />
                          <span className="font-serif text-sm font-bold leading-5 text-[#073d32]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Admin actions */}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-5">
                  <button
                    onClick={() => handleToggleStatus(service)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#66736d] transition hover:text-[#104735]"
                    title={
                      service.isActive === false
                        ? "Activate service"
                        : "Deactivate service"
                    }
                  >
                    {service.isActive === false ? (
                      <>
                        <Eye size={15} />
                        Activate
                      </>
                    ) : (
                      <>
                        <EyeOff size={15} />
                        Deactivate
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#64736b] transition hover:border-[#104735] hover:bg-[#104735] hover:text-white"
                      title="Edit service"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => handleDelete(service)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:bg-red-500 hover:text-white"
                      title="Delete service"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#061d16]/70 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between bg-[#104735] px-5 py-5 text-white sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b4ff35]">
                  Service Management
                </p>

                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                disabled={saving || uploadingImage}
                className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-7">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={17} />
                    {error}
                  </div>
                )}

                {/* Category and title */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Example: WATER TREATMENT"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735] focus:ring-2 focus:ring-[#104735]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Service Title <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter service title"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735] focus:ring-2 focus:ring-[#104735]/10"
                    />
                  </div>
                </div>

                {/* Image upload */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Service Image
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`rounded-xl border-2 border-dashed p-4 transition-colors duration-200 ${
                      isDragging
                        ? "border-[#104735] bg-[#e8f0eb]"
                        : "border-gray-200 bg-[#f9fbf9]"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={imagePreview}
                          alt="Service preview"
                          className="h-52 w-full object-cover"
                        />

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-4 py-3 text-white">
                          <span className="text-xs font-medium">
                            Image preview
                          </span>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploadingImage}
                              className="inline-flex items-center gap-1 rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/30 disabled:opacity-50"
                            >
                              <Upload size={14} />
                              Change
                            </button>

                            <button
                              type="button"
                              onClick={removeImage}
                              disabled={uploadingImage}
                              className="rounded-lg bg-red-500/80 p-2 transition hover:bg-red-500 disabled:opacity-50"
                              title="Remove image"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {uploadingImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#104735]">
                              <Loader2 size={18} className="animate-spin" />
                              Uploading image...
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex w-full cursor-pointer flex-col items-center justify-center py-8 text-center"
                      >
                        <div className="mb-3 rounded-full bg-[#e8f0eb] p-4 text-[#104735]">
                          <Upload size={25} />
                        </div>

                        <span className="text-sm font-semibold text-[#104735]">
                          Drag and drop an image here or click to upload
                        </span>

                        <span className="mt-2 text-xs text-gray-400">
                          PNG, JPG or WEBP · Maximum 5 MB
                        </span>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden"
                    />
                  </div>

                  {imageError && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {imageError}
                    </p>
                  )}

                  {formData.image && !uploadingImage && !imageError && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle2 size={14} />
                      Image uploaded successfully.
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Enter service description..."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735] focus:ring-2 focus:ring-[#104735]/10"
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">
                      Service Features
                    </label>

                    <button
                      type="button"
                      onClick={addFeature}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#104735] hover:text-[#6d9b36]"
                    >
                      <Plus size={15} />
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          placeholder={`Feature ${index + 1}`}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735]"
                        />

                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="rounded-xl border border-red-100 px-3 text-red-500 transition hover:bg-red-50"
                          >
                            <X size={17} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button and link */}
                {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Button Text
                    </label>

                    <input
                      type="text"
                      name="button"
                      value={formData.button}
                      onChange={handleInputChange}
                      placeholder="Explore More"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Button Link
                    </label>

                    <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="/services/example"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735]"
                    />
                  </div>
                </div> */}

                {/* Sort order and active status */}
                {editingService && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Sort Order
                      </label>

                      <input
                        type="number"
                        name="sortOrder"
                        value={formData.sortOrder}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735]"
                      />
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                      <input
                        id="isActive"
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 accent-[#104735]"
                      />

                      <label
                        htmlFor="isActive"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Active Service
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving || uploadingImage}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#104735] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3829] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : uploadingImage ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Uploading Image...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      {editingService ? "Update Service" : "Create Service"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}