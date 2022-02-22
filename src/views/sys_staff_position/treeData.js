import i18n from "@/common/plugins/vue-i18n";
import { locale as tree } from "@/common/config/i18n/zh";
// i18n.tc('GENERAL.DEPARTMENT')
const treeData = () => {
    let treeIndex = [];
    //針對資料做分層排序
    let layer1 = [];
    let layer2 = [];
    let layer3 = [];
    let layer4 = [];
    let layer5 = [];
    let layer6 = [];
    let layer7 = [];

    for (const key in tree.permissions) {
        treeIndex.push(key);
        switch (key.split("_").length) {
            case 1:
                key != 0 && layer1.push(key);
                break;

            case 2:
                layer2.push(key);
                break;

            case 3:
                layer3.push(key);
                break;

            case 4:
                layer4.push(key);
                break;

            case 5:
                layer5.push(key);
                break;

            case 6:
                layer6.push(key);
                break;

            case 7:
                layer7.push(key);
                break;

            default:
                break;
        }
    }
    //排序資料
    treeIndex = [
        ...layer1,
        ...layer2,
        ...layer3,
        ...layer4,
        ...layer5,
        ...layer6,
        ...layer7,
    ];
    //設定第一層(所有權限)
    let treeData = [
        {
            id: `0`,
            label: i18n.tc(`permissions.0`),
            children: [],
        },
    ];
    treeIndex.forEach(async (params, index) => {
        let splitArray = params.split("_");

        switch (splitArray.length) {
            case 1:
                treeData[0].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;
            case 2:
                treeData[0].children[parseInt(splitArray[0]) - 1].children.push(
                    {
                        id: `${params}`,
                        label: i18n.tc(`permissions.${params}`),
                        children: [],
                    }
                );
                break;
            case 3:
                treeData[0].children[parseInt(splitArray[0]) - 1].children[
                    parseInt(splitArray[1]) - 1
                ].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;
            case 4:
                treeData[0].children[parseInt(splitArray[0]) - 1].children[
                    parseInt(splitArray[1]) - 1
                ].children[parseInt(splitArray[2]) - 1].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;
            case 5:
                treeData[0].children[parseInt(splitArray[0]) - 1].children[
                    parseInt(splitArray[1]) - 1
                ].children[parseInt(splitArray[2]) - 1].children[
                    parseInt(splitArray[3]) - 1
                ].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;
            case 6:
                treeData[0].children[parseInt(splitArray[0]) - 1].children[
                    parseInt(splitArray[1]) - 1
                ].children[parseInt(splitArray[2]) - 1].children[
                    parseInt(splitArray[3]) - 1
                ].children[parseInt(splitArray[4]) - 1].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;
            case 7:
                treeData[0].children[parseInt(splitArray[0]) - 1].children[
                    parseInt(splitArray[1]) - 1
                ].children[parseInt(splitArray[2]) - 1].children[
                    parseInt(splitArray[3]) - 1
                ].children[parseInt(splitArray[4]) - 1].children[
                    parseInt(splitArray[5]) - 1
                ].children.push({
                    id: `${params}`,
                    label: i18n.tc(`permissions.${params}`),
                    children: [],
                });
                break;

            default:
                break;
        }
    });
    return treeData;
};

export default treeData;
