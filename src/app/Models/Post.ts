export interface Post{
    id: string;
    latitude: string;
    longitude: string;
    postImage: string;
    caption: string;
    likesNo: number;
    commentsNo: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}