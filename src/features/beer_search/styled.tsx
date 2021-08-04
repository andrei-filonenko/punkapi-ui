import tw, { styled } from 'twin.macro';


export const SearchSectionContainer = styled.div`
  ${tw`my-5 flex max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full`}
  &> form.filter {
    ${tw`flex flex-col m-3 mt-6 flex-1`}
  }
`;

export const ErrorMessage = styled.span`
  ${tw`p-2 uppercase text-pink-600 text-xs`}
`;

export const SearchBarContainer = styled.span`
  ${tw`bg-white shadow relative flex font-bold`}

  && > ${ErrorMessage} {
    position: absolute;
    top: -1.5rem;
  }

  & > input {
    ${tw`w-full rounded p-2`}
  }

  &.error input {
    ${tw`text-pink-400`}
  }
`;

export const SearchTypeContainer = styled.div`
  ${tw`mt-2 uppercase font-bold`}
  & > label {
    ${tw`inline-flex items-center`}
    span {
      ${tw`ml-2`}
    }
  }

  & > label:nth-child(2) {
    ${tw`ml-6`}
  }

`;
