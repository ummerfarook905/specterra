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
  RefreshCw,
} from "lucide-react";

import {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamImage,
} from "../../api/teamApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_ORIGIN = API_BASE_URL
  .replace(/\/api(?:\/v\d+)?\/?$/i, "")
  .replace(/\/+$/, "");

const getImageUrl = (image) => {
  if (!image) return "";

  if (/^(https?:)?\/\//i.test(image)) return image;
  if (/^(data|blob):/i.test(image)) return image;

  let imagePath = image
    .replace(/^\/?api\/uploads\//i, "/uploads/")
    .replace(/^uploads\//i, "/uploads/");

  if (!imagePath.startsWith("/")) {
    imagePath = `/uploads/${imagePath}`;
  }

  return `${API_ORIGIN}${imagePath}`;
};

const emptyForm = {
  name: "",
  badge: "",
  experience: "",
  qualification: "",
  designation: "",
  description: "",
  skills: [""],
  location: "",
  achievement: "",
  image: "",
  isActive: true,
  sortOrder: 0,
};

export default function TeamManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  // Fetch team members
  const fetchMembers = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await getAllTeamMembers();

    console.log("Team API response:", response);

    // Support both response formats
    const membersData = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

    setMembers(membersData);
  } catch (err) {
    console.error("Fetch team error:", err);
    console.error("API error response:", err?.response?.data);

    setError(
      err?.response?.data?.message ||
        err?.message ||
        "Failed to load team members."
    );

    setMembers([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMembers();
  }, []);

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

    setFormData({ ...emptyForm, skills: [""] });
    setImagePreview("");
    setImageError("");
    setIsDragging(false);
    setEditingMember(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openAddModal = () => {
    clearMessages();
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    clearMessages();
    resetForm();

    setEditingMember(member);

    setFormData({
      name: member.name || "",
      badge: member.badge || "",
      experience: member.experience || "",
      qualification: member.qualification || "",
      designation: member.designation || "",
      description: member.description || "",
      skills:
        Array.isArray(member.skills) && member.skills.length
          ? member.skills
          : [""],
      location: member.location || "",
      achievement: member.achievement || "",
      image: member.image || "",
      isActive: member.isActive ?? true,
      sortOrder: member.sortOrder ?? 0,
    });

    setImagePreview(getImageUrl(member.image));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving || uploadingImage) return;

    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Skills
  const handleSkillChange = (index, value) => {
    setFormData((prev) => {
      const skills = [...prev.skills];
      skills[index] = value;

      return { ...prev, skills };
    });
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Image upload
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

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    clearPreviewUrl();

    const preview = URL.createObjectURL(file);
    previewUrlRef.current = preview;

    setImagePreview(preview);
    setUploadingImage(true);

    try {
      const uploadedImage = await uploadTeamImage(file);

      if (!uploadedImage) {
        throw new Error("Image upload did not return an image path.");
      }

      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
    } catch (err) {
      console.error("Team image upload error:", err);

      setImageError(
        err?.response?.data?.message ||
          err?.message ||
          "Image upload failed."
      );

      setFormData((prev) => ({
        ...prev,
        image: editingMember?.image || "",
      }));

      setImagePreview(
        editingMember?.image
          ? getImageUrl(editingMember.image)
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

    if (file) {
      handleImageChange({
        target: { files: [file] },
      });
    }
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

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    const requiredFields = [
      ["name", "Please enter the team member name."],
      ["badge", "Please enter the member badge."],
      ["experience", "Please enter the experience."],
      ["qualification", "Please enter the qualification."],
      ["designation", "Please enter the designation."],
      ["description", "Please enter the description."],
      ["location", "Please enter the location."],
      ["achievement", "Please enter the achievement."],
    ];

    for (const [field, message] of requiredFields) {
      if (!String(formData[field] || "").trim()) {
        setError(message);
        return;
      }
    }

    if (uploadingImage) {
      setError("Please wait until the image upload finishes.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      badge: formData.badge.trim(),
      experience: formData.experience.trim(),
      qualification: formData.qualification.trim(),
      designation: formData.designation.trim(),
      description: formData.description.trim(),
      skills: formData.skills
        .map((skill) => skill.trim())
        .filter(Boolean),
      location: formData.location.trim(),
      achievement: formData.achievement.trim(),
      image: formData.image || null,
      sortOrder: Number(formData.sortOrder) || 0,
    };

    try {
      setSaving(true);

      if (editingMember) {
        await updateTeamMember(editingMember.id, {
          ...payload,
          isActive: formData.isActive,
        });

        setSuccess("Team member updated successfully.");
      } else {
        await createTeamMember({
          ...payload,
          isActive: true,
        });

        setSuccess("Team member created successfully.");
      }

      setIsModalOpen(false);
      resetForm();

      await fetchMembers();
    } catch (err) {
      console.error("Save team member error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to save team member."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${member.name}"?`
    );

    if (!confirmed) return;

    clearMessages();

    try {
      await deleteTeamMember(member.id);

      setSuccess("Team member deleted successfully.");
      await fetchMembers();
    } catch (err) {
      console.error("Delete team member error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete team member."
      );
    }
  };

  // Toggle status
  const handleToggleStatus = async (member) => {
    clearMessages();

    try {
      await updateTeamMember(member.id, {
        isActive: !member.isActive,
      });

      setSuccess("Team member status updated successfully.");
      await fetchMembers();
    } catch (err) {
      console.error("Update status error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  // Search and filters
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      member.name?.toLowerCase().includes(search) ||
      member.designation?.toLowerCase().includes(search) ||
      member.qualification?.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && member.isActive !== false) ||
      (filterStatus === "inactive" && member.isActive === false);

    return matchesSearch && matchesStatus;
  });

  const activeCount = members.filter(
    (member) => member.isActive !== false
  ).length;

  const inactiveCount = members.length - activeCount;

  return (
    <div className="min-h-screen bg-[#f4f7f5] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#7a9487]">
            Content Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#104735] sm:text-4xl">
            Team Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your leadership team and member profiles.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#104735] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#104735]/10 transition hover:bg-[#0b3829]"
        >
          <Plus size={18} />
          Add Team Member
        </button>
      </div>

      {/* Notifications */}
      {error && !isModalOpen && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError("")} className="ml-auto">
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {success}
          <button onClick={() => setSuccess("")} className="ml-auto">
            <X size={17} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Members</p>
          <h2 className="mt-2 text-3xl font-bold text-[#104735]">
            {members.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Members</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#e4ece7] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Inactive Members</p>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search team members..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#104735]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#104735]"
          >
            <option value="all">All Members</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={fetchMembers}
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

      {/* Team cards */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="animate-spin text-[#104735]" size={35} />
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
          <ImageIcon className="mx-auto mb-4 text-gray-300" size={45} />
          <h3 className="font-serif text-xl font-bold text-[#073d32]">
            No Team Members Found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Add a team member or change your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e5ebe7] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-[240px] overflow-hidden bg-gradient-to-br from-[#164c3a] via-[#0b382a] to-[#05291f]">
                {member.image ? (
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/60">
                    <ImageIcon size={46} />
                  </div>
                )}

                <span className="absolute left-3 top-3 bg-[#063c30] px-3 py-2 font-serif text-xs font-bold uppercase tracking-wide text-white">
                  {member.badge}
                </span>

                <span
                  className={`absolute right-3 top-3 rounded-md px-3 py-2 text-xs font-semibold text-white ${
                    member.isActive === false
                      ? "bg-gray-500"
                      : "bg-[#548d13]"
                  }`}
                >
                  {member.isActive === false ? "Inactive" : "Active"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-serif text-xl font-bold text-[#073d32]">
                  {member.name}
                </h2>

                <p className="mt-1 text-sm font-bold text-[#548d13]">
                  {member.qualification}
                </p>

                <p className="text-sm text-gray-500">
                  {member.designation}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {member.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {member.skills?.map((skill, index) => (
                    <span
                      key={`${member.id}-${index}`}
                      className="border border-[#dce5df] bg-[#edf3ef] px-2 py-1 text-xs font-semibold text-[#244b36]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-5">
                  <button
                    onClick={() => handleToggleStatus(member)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#66736d] transition hover:text-[#104735]"
                    title={
                      member.isActive === false
                        ? "Activate member"
                        : "Deactivate member"
                    }
                  >
                    {member.isActive === false ? (
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
                      onClick={() => openEditModal(member)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#64736b] transition hover:border-[#104735] hover:bg-[#104735] hover:text-white"
                      title="Edit member"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => handleDelete(member)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-500 hover:text-white"
                      title="Delete member"
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
                  Team Management
                </p>

                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  {editingMember ? "Edit Team Member" : "Add Team Member"}
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

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-7">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={17} />
                    {error}
                  </div>
                )}

                {/* Name and badge */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />

                  <FormField
                    label="Badge"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="Example: TECHNICAL DIRECTOR"
                    required
                  />
                </div>

                {/* Experience and qualification */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Example: 15+ Years"
                    required
                  />

                  <FormField
                    label="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="Example: Ph.D. Environmental Science"
                    required
                  />
                </div>

                <FormField
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  required
                />

                {/* Image upload */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Profile Image
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => {
                      if (!uploadingImage && !imagePreview) {
                        fileInputRef.current?.click();
                      }
                    }}
                    className={`relative overflow-hidden rounded-xl border-2 border-dashed p-4 transition-all ${
                      isDragging
                        ? "border-[#104735] bg-[#e8f0eb]"
                        : "border-gray-200 bg-[#f9fbf9] hover:border-[#104735]"
                    } ${!imagePreview ? "cursor-pointer" : ""}`}
                  >
                    {imagePreview ? (
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
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
                              className="inline-flex items-center gap-1 rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/30"
                            >
                              <Upload size={14} />
                              Change
                            </button>

                            <button
                              type="button"
                              onClick={removeImage}
                              disabled={uploadingImage}
                              className="rounded-lg bg-red-500/80 p-2 hover:bg-red-500"
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
                      <div className="flex flex-col items-center justify-center py-9 text-center">
                        <div className="mb-3 rounded-full bg-[#e8f0eb] p-4 text-[#104735]">
                          <Upload size={28} />
                        </div>

                        <p className="text-sm font-semibold text-[#104735]">
                          {isDragging
                            ? "Drop your image here"
                            : "Drag and drop your image here"}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          or{" "}
                          <span className="font-semibold text-[#104735] underline">
                            browse files
                          </span>
                        </p>

                        <p className="mt-3 text-xs text-gray-400">
                          PNG, JPG or WEBP · Maximum 5 MB
                        </p>
                      </div>
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

                <FormField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a short professional description"
                  textarea
                  required
                />

                {/* Skills */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">
                      Skills
                    </label>

                    <button
                      type="button"
                      onClick={addSkill}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#104735] hover:text-[#6d9b36]"
                    >
                      <Plus size={15} />
                      Add Skill
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(index, e.target.value)
                          }
                          placeholder={`Skill ${index + 1}`}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735]"
                        />

                        {formData.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="rounded-xl border border-red-100 px-3 text-red-500 hover:bg-red-50"
                          >
                            <X size={17} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location and achievement */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Example: Kerala, India"
                    required
                  />

                  <FormField
                    label="Achievement"
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleInputChange}
                    placeholder="Example: 20+ Projects"
                    required
                  />
                </div>

                {/* Display order */}
                <FormField
                  label="Display Order"
                  name="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={handleInputChange}
                  min="0"
                />

                {/* Active status */}
                {editingMember && (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                    <input
                      id="teamIsActive"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 accent-[#104735]"
                    />

                    <label
                      htmlFor="teamIsActive"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Active Team Member
                    </label>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving || uploadingImage}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#104735] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b3829] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving || uploadingImage ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      {uploadingImage ? "Uploading Image..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      {editingMember ? "Update Member" : "Create Member"}
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

// Reusable form field
function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  textarea = false,
  min,
}) {
  const className =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#104735] focus:ring-2 focus:ring-[#104735]/10";

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          required={required}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className={className}
        />
      )}
    </div>
  );
}