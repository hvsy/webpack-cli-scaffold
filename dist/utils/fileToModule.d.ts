export default function fileToModule(withName?: boolean): (file: string | {
    path: string;
    name: string;
}) => any;
