
import { pick, map, partialRight } from 'lodash'
import toast from 'react-hot-toast';
import { csvExport } from 'src/@core/utils/csv-export'

export enum ExportList {
    category = 'category',
    customer = 'customer',

    product = 'product',
    order = 'order',
    affialtes = 'affialtes',


}

const Data = new Map<string, any>([
    [ExportList.category, {
        filename: "category",
        headers: ['name', 'title', 'order', 'status', 'created at'], // file header
        pick: ['name', 'title', 'order', 'status', 'createdAt'] // keys of arrays.
    }],
    [ExportList.customer, {
        filename: "customer",
        headers: ['name', 'title', 'order', 'status', 'created at'], // file header
        pick: ['name', 'title', 'order', 'status', 'createdAt'] // keys of arrays.
    }],
    [ExportList.product, {
        filename: "product",
        headers: ['name', 'title', 'order', 'status', 'created at'], // file header
        pick: ['name', 'title', 'order', 'status', 'createdAt'] // keys of arrays.
    }],

    [ExportList.order, {
        filename: "order",
        headers: ['link', 'order', 'created at'], // file header
        pick: ['link', 'order', 'createdAt'] // keys of arrays.
    }],
    [ExportList.affialtes, {
        filename: "affialtes",
        headers: ['link', 'order', 'created at'], // file header
        pick: ['link', 'order', 'createdAt'] // keys of arrays.
    }],
]);

export const csvDownload = (moduleName: ExportList, arrayJson: any) => {

    if (Data.has(moduleName)) {

        const filemodule = Data.get(moduleName)
        const mapped = map(arrayJson, partialRight(pick, filemodule.pick));

        csvExport({
            filename: filemodule.filename,
            headers: filemodule.headers,
            data: mapped,
        })
    } else {
        toast.error("Invalid CSV export")
    }
}