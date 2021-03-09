import fs from "fs";
import { doc } from "prettier";

export default class Searcher {
    constructor(files) {
        // TODO: Build the Inverted Index.
        this.invertedIndex = this.getInvertedIndexFromFiles(files);
    }

    search(query) {
        // TODO: Search the indexed files.
        return [];
    }

    getInvertedIndexFromFiles(files) {
        try {
            const invertedIndex = new Map();

            files.forEach(file => {
                const documentText = fs.readFileSync(file, "utf-8");
                const terms = this.termifyText(documentText);

                terms.forEach(term => {
                    if (invertedIndex.has(term)) {
                        const postingList = new Set(invertedIndex.get(term));
                        postingList.add(file);
                        invertedIndex.set(term, [...postingList]);
                    } else {
                        invertedIndex.set(term, [file]);
                    }
                });
            });

            return invertedIndex;
        } catch (err) {
            console.error(err);
        }
    }

    termifyText(text) {
        const punctuationRegex = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/g;
        const newLineRegex = /(\r\n|\n|\r)/gm;

        return text
            .replace(punctuationRegex, "")
            .replace(newLineRegex, "")
            .toLowerCase()
            .split(" ");
    }
}
