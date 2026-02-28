import { useState, useRef } from "react";
import { Upload, FileText, X, Edit3, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

const FileUploadView = () => {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "f1", name: "Q2 Planning Meeting.mp4", size: "124 MB", type: "video/mp4", uploadedAt: "2 hours ago" },
    { id: "f2", name: "Sprint Retro Notes.pdf", size: "2.3 MB", type: "application/pdf", uploadedAt: "Yesterday" },
  ]);
  const [dragOver, setDragOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const mapped: UploadedFile[] = newFiles.map((f, i) => ({
      id: `f-${Date.now()}-${i}`,
      name: f.name,
      size: formatSize(f.size),
      type: f.type,
      uploadedAt: "Just now",
    }));
    setFiles((prev) => [...mapped, ...prev]);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const startEdit = (file: UploadedFile) => {
    setEditingId(file.id);
    setEditName(file.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      setFiles((prev) => prev.map((f) => (f.id === editingId ? { ...f, name: editName.trim() } : f)));
    }
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Upload Files</h2>
      <p className="text-sm text-muted-foreground mb-8">Upload meeting recordings, notes, or documents for processing</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`glass-panel-raised border-2 border-dashed cursor-pointer transition-all duration-300 p-12 text-center mb-8 hover:border-foreground/20
          ${dragOver ? "border-foreground/30 bg-muted/60 scale-[1.01]" : "border-border"}
        `}
      >
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Upload className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">Drop files here or click to browse</p>
        <p className="text-xs text-muted-foreground">Supports MP4, MP3, PDF, DOCX, TXT</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept=".mp4,.mp3,.pdf,.docx,.txt,.wav,.m4a"
          onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">Uploaded Files</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="glass-panel p-4 flex items-center gap-4 group hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                  {editingId === file.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      autoFocus
                      className="text-sm font-medium text-foreground bg-muted/50 rounded-lg px-2 py-1 w-full outline-none border border-border focus:border-foreground/30"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground">{file.size} · {file.uploadedAt}</p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-lg"
                    onClick={() => startEdit(file)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-lg text-status-missing hover:text-status-missing"
                    onClick={() => removeFile(file.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="glass-panel p-10 text-center">
          <p className="text-sm text-muted-foreground">No files uploaded yet. Drop a file above to get started.</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadView;
