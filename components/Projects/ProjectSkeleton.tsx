
const ProjectSkeleton = () => {
    return (
        <div className="h-full w-full rounded-2xl border border-border/40 bg-card/20 overflow-hidden">
            <div className="animate-pulse flex flex-col h-full">
                {/* Image Skeleton */}
                <div className="relative aspect-[16/10] w-full bg-muted/40" />

                {/* Content Skeleton */}
                <div className="flex flex-col flex-1 p-4 xs:p-5 space-y-4">
                    {/* Date & Title */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <div className="h-3 w-20 bg-muted/40 rounded" />
                            <div className="h-3 w-16 bg-muted/40 rounded" />
                        </div>
                        <div className="h-6 w-3/4 bg-muted/50 rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-muted/40 rounded" />
                            <div className="h-4 w-5/6 bg-muted/40 rounded" />
                        </div>
                    </div>

                    {/* Tags Skeleton */}
                    <div className="flex gap-2 pt-2">
                        <div className="h-5 w-12 bg-muted/40 rounded" />
                        <div className="h-5 w-16 bg-muted/40 rounded" />
                        <div className="h-5 w-10 bg-muted/40 rounded" />
                    </div>

                    {/* Footer Skeleton */}
                    <div className="pt-3 mt-auto flex justify-between items-center border-t border-border/20">
                        <div className="h-3 w-24 bg-muted/40 rounded" />
                        <div className="h-4 w-4 bg-muted/40 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
